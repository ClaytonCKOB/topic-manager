package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.UserDTO;
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

    public List<UserAccount> listActiveUsers() {
        return userAccountRepository.findByActiveTrue();
    }

    public List<UserAccount> list() {
        return userAccountRepository.findAll();
    }

    public void delete(Long userAccountId) {
        userAccountRepository.deleteById(userAccountId);
    }

    public void update(UserDTO userDTO) {
        UserAccount user = getUser(userDTO.id());
        user.setName(userDTO.name());
        user.setEmail(userDTO.email());

        userAccountRepository.save(user);
    }

    public UserAccount getUser(Long id) {
        return userAccountRepository.findById(id).get();
    }
}
