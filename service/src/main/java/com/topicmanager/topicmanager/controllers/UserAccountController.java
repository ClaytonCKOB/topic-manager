package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.UserDTO;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.services.UserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user-account")
@Tag(name = "User Accounts", description = "User account management endpoints")
public class UserAccountController {

    @Autowired
    UserAccountService userAccountService;

    @PutMapping
    @Operation(summary = "Update user account", description = "Update an existing user account")
    public ResponseEntity updateUserAccount(@RequestBody UserDTO userDTO){
        userAccountService.update(userDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Get a specific user account by ID")
    public ResponseEntity<UserDTO> findById(
            @Parameter(description = "User ID") @PathVariable Long id){
        UserAccount user = userAccountService.getUser(id);
        if(user == null)
            return ResponseEntity.notFound().build();


        return ResponseEntity.ok(new UserDTO(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getRole(), user.getActive()));
    }

    @GetMapping
    @Operation(summary = "List all active users", description = "Get a list of all active user accounts")
    public ResponseEntity<List<UserDTO>> getAllUserAccount() {
        return ResponseEntity.ok(userAccountService.listActiveUsers().stream().map(user -> new UserDTO(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getRole(), user.getActive())).toList());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user account", description = "Delete (deactivate) a user account")
    public ResponseEntity deleteUserAccount(
            @Parameter(description = "User ID") @PathVariable Long id){
        userAccountService.delete(id);
        return ResponseEntity.ok().build();
    }
}
