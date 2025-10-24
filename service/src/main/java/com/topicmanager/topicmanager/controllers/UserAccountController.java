package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.UserDTO;
import com.topicmanager.topicmanager.entities.UserAccount;
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

    @PutMapping
    public ResponseEntity updateUserAccount(@RequestBody UserDTO userDTO){
        userAccountService.update(userDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id){
        UserAccount user = userAccountService.getUser(id);
        if(user == null)
            return ResponseEntity.notFound().build();


        return ResponseEntity.ok(new UserDTO(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getRole(), user.getActive()));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUserAccount() {
        return ResponseEntity.ok(userAccountService.listActiveUsers().stream().map(user -> new UserDTO(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getRole(), user.getActive())).toList());
    }

    @DeleteMapping
    public ResponseEntity deleteUserAccount(@RequestParam Long id){
        userAccountService.delete(id);
        return ResponseEntity.ok().build();
    }
}
