package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.ActionItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActionItemRepository extends JpaRepository<ActionItem, Long> {
    List<ActionItem> findByActorIdAndCompletedFalse(Long actorId);
}