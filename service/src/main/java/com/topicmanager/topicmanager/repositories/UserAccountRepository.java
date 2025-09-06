package com.topicmanager.topicmanager.repositories;


import com.topicmanager.topicmanager.entities.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
}