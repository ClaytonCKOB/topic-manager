package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.UserDTO;
import com.topicmanager.topicmanager.dto.UserInviteDTO;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.entities.UserAccountInvite;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import com.topicmanager.topicmanager.repositories.UserAccountInviteRepository;
import com.topicmanager.topicmanager.repositories.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    public void create(UserInviteDTO userAccountInviteDTO) {
        UserAccountInvite userAccountInvite = new UserAccountInvite(userAccountInviteDTO);
        userAccountInviteRepository.save(userAccountInvite);

        notificationService.sendInvitation(userAccountInvite);
    }

    public void delete(Long userAccountId) {
        UserAccountInvite userAccountInvite = userAccountInviteRepository.findById(userAccountId).get();
        userAccountInvite.setActive(false);
        userAccountInviteRepository.save(userAccountInvite);
    }
}
