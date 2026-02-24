package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.UserInviteDTO;
import com.topicmanager.topicmanager.entities.UserAccountInvite;
import com.topicmanager.topicmanager.repositories.UserAccountInviteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountInviteService {

    @Autowired
    UserAccountInviteRepository userAccountInviteRepository;

    @Autowired
    NotificationService notificationService;

    public List<UserAccountInvite> list() {
        return userAccountInviteRepository.findAll();
    }

    public void create(List<UserInviteDTO> userInviteDTOList) throws RuntimeException {
        Boolean hasErrorSendingEmail = false;

        for (UserInviteDTO userInviteDTO : userInviteDTOList) {
            UserAccountInvite userAccountInvite = new UserAccountInvite(
                userInviteDTO.sender_id(),
                userInviteDTO.email(),
                userInviteDTO.role()
            );

            try {
                notificationService.sendInvitation(userAccountInvite);
            } catch (Exception e) {
                hasErrorSendingEmail = true;
            }

            userAccountInviteRepository.save(userAccountInvite);
        }

        if (hasErrorSendingEmail) {
            throw new RuntimeException("Failed to send invitation email");
        }
    }

    public UserInviteDTO getInvitation(String id) {
        UserAccountInvite userAccountInvite = userAccountInviteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Invite not found"));


        return new UserInviteDTO(userAccountInvite.getSender_id(), userAccountInvite.getEmail(), userAccountInvite.getRole());
    }
}
