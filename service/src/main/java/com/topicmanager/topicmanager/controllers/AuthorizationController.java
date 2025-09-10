package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.AuthenticationDTO;
import com.topicmanager.topicmanager.dto.LoginResponseDTO;
import com.topicmanager.topicmanager.dto.RegisterDTO;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import com.topicmanager.topicmanager.repositories.UserAccountRepository;
import com.topicmanager.topicmanager.services.TokenService;
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
public class AuthorizationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);
        UserAccount user = (UserAccount) auth.getPrincipal();
        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(new LoginResponseDTO(token, user.getRole()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data) {
        if (data.username().isEmpty() || data.password().isEmpty()) {
            return ResponseEntity.badRequest().body("Usuário e senha são obrigatórios.");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        UserAccount user = (UserAccount) userAccountRepository.findByUsername(data.username());
        if (user != null) {
            // reuse disabled user
            user.setActive(true);
            user.setPassword(encryptedPassword);
            user.setRole(data.role());
            userAccountRepository.save(user);
        } else {
            user = new UserAccount(data.username(), encryptedPassword, data.role());
            userAccountRepository.save(user);
        }

        return ResponseEntity.ok().build();
    }
}
