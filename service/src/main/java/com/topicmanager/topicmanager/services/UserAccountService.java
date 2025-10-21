package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import com.topicmanager.topicmanager.repositories.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    public List<UserAccount> listNotAdminUsers() {
        return userAccountRepository.findByRoleNot(UserAccountRole.ADMIN);
    }

    public List<UserAccount> list() {
        return userAccountRepository.findAll();
    }
}
