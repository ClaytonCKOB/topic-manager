package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.UserDTO;
import com.topicmanager.topicmanager.dto.UserInviteDTO;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.entities.UserAccountInvite;
import com.topicmanager.topicmanager.services.UserAccountInviteService;
import com.topicmanager.topicmanager.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user-account-invite")
public class UserAccountInviteController {

    @Autowired
    UserAccountInviteService userAccountInviteService;

    @PostMapping
    public ResponseEntity createInvite(@RequestBody UserInviteDTO userInviteDTO){
        userAccountInviteService.create(userInviteDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<UserAccountInvite>> listInvites(){
        List<UserAccountInvite> userInviteList = userAccountInviteService.list();
        return ResponseEntity.ok(userInviteList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInviteDTO> getInvites(@PathVariable String id){
        UserInviteDTO userInvite = userAccountInviteService.getInvitation(id);
        return ResponseEntity.ok(userInvite);
    }

}
