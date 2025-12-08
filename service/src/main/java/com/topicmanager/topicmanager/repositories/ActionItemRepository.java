package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.ActionItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionItemRepository extends JpaRepository<ActionItem, Long> {
}