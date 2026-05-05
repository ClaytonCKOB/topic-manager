package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.*;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.entities.UserAccountInvite;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import com.topicmanager.topicmanager.repositories.UserAccountInviteRepository;
import com.topicmanager.topicmanager.repositories.UserAccountRepository;
import com.topicmanager.topicmanager.services.TokenService;
import com.topicmanager.topicmanager.services.UserAccountInviteService;
import com.topicmanager.topicmanager.services.UserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@Tag(name = "Authentication", description = "User authentication and registration endpoints")
public class AuthorizationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserAccountInviteService userAccountInviteService;

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user and return JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = @Content(schema = @Schema(implementation = LoginResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid credentials or missing fields")
    })
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO data) {
        if (data.username().isEmpty() || data.password().isEmpty())
            return ResponseEntity.badRequest().body("Usuário e senha são obrigatórios.");

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);
        UserAccount user = (UserAccount) auth.getPrincipal();
        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(new LoginResponseDTO(token, user.getRole(), user.getName(), user.getId()));
    }

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Create a new user account or reactivate an existing one")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registration successful"),
            @ApiResponse(responseCode = "400", description = "Invalid data or registration failed")
    })
    public ResponseEntity<?> register(@RequestBody RegisterDTO data) {
        try {
            if (data.username().isEmpty() || data.password().isEmpty() || data.email().isEmpty()) {
                return ResponseEntity.badRequest().body("Usuário e senha são obrigatórios.");
            }

            String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
            UserAccount user = (UserAccount) userAccountRepository.findByUsername(data.username());
            if (user != null) {
                user.setActive(true);
                user.setPassword(encryptedPassword);
                user.setRole(data.role());
                userAccountRepository.save(user);
            } else {
                user = new UserAccount(data.username(), encryptedPassword, data.role(), data.email(), data.name());
                userAccountRepository.save(user);
            }

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/register-invite")
    @Operation(summary = "Register with invitation", description = "Register a new user using an invitation code")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registration with invitation successful"),
            @ApiResponse(responseCode = "400", description = "Invalid invitation or email mismatch")
    })
    public ResponseEntity<?> registerInvite(@RequestBody RegisterInviteDTO data) {
        try {
            if (data.username().isEmpty() || data.password().isEmpty() || data.email().isEmpty()) {
                return ResponseEntity.badRequest().body("Usuário e senha são obrigatórios.");
            }

            UserInviteDTO invite = userAccountInviteService.getInvitation(data.invitation_id());

            if (!invite.email().equalsIgnoreCase(data.email())) {
                return ResponseEntity.badRequest().body("O email fornecido não corresponde ao convite.");
            }

            String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
            UserAccount user = (UserAccount) userAccountRepository.findByUsername(data.username());
            if (user != null) {
                user.setActive(true);
                user.setPassword(encryptedPassword);
                user.setRole(invite.role());
                userAccountRepository.save(user);
            } else {
                user = new UserAccount(data.username(), encryptedPassword, invite.role(), data.email(), data.name());
                userAccountRepository.save(user);
            }

            userAccountService.addUserToOpenMeetings(user);

            userAccountInviteService.expireInvitation(data.invitation_id());

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
