package com.topicmanager.topicmanager.repositories;


import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    UserDetails findByUsername(String username);

    List<UserAccount> findByRoleNot(UserAccountRole role);

    List<UserAccount> findByActiveTrue();
}