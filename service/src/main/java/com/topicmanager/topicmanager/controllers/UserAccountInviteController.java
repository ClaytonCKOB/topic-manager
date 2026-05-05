package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.UserInviteDTO;
import com.topicmanager.topicmanager.entities.UserAccountInvite;
import com.topicmanager.topicmanager.services.UserAccountInviteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user-account-invite")
@Tag(name = "User Invitations", description = "User invitation management endpoints")
public class UserAccountInviteController {

    @Autowired
    UserAccountInviteService userAccountInviteService;

    @PostMapping
    @Operation(summary = "Create invitations", description = "Create one or more user invitations")
    public ResponseEntity createInvite(@RequestBody List<UserInviteDTO> userInviteDTOList) throws Exception{
        userAccountInviteService.create(userInviteDTOList);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "List all invitations", description = "Get a list of all user invitations")
    public ResponseEntity<List<UserAccountInvite>> listInvites(){
        List<UserAccountInvite> userInviteList = userAccountInviteService.list();
        return ResponseEntity.ok(userInviteList);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get invitation by ID", description = "Get a specific invitation by its ID")
    public ResponseEntity<UserInviteDTO> getInvites(
            @Parameter(description = "Invitation ID") @PathVariable String id){
        UserInviteDTO userInvite = userAccountInviteService.getInvitation(id);
        return ResponseEntity.ok(userInvite);
    }

}
