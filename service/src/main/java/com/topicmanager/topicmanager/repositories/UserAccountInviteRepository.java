package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.UserAccountInvite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountInviteRepository extends JpaRepository<UserAccountInvite, String> {
}