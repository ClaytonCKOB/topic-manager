package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.UserDTO;
import com.topicmanager.topicmanager.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user-account")
public class UserAccountController {

    @Autowired
    UserAccountService userAccountService;

    @PostMapping("/:id")
    public ResponseEntity updateUserAccount(@PathVariable Long id, @RequestBody UserDTO userDTO){

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUserAccount() {
        return ResponseEntity.ok(userAccountService.list().stream().map(user -> new UserDTO(user.getName(), user.getUsername(), user.getEmail(), user.getRole(), user.getActive())).toList());
    }
}
