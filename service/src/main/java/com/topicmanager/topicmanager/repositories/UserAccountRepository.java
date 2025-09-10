package com.topicmanager.topicmanager.repositories;


import com.topicmanager.topicmanager.entities.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    UserDetails findByUsername(String username);
}