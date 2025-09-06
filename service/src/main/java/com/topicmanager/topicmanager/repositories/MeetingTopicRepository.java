package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.MeetingTopic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingTopicRepository extends JpaRepository<MeetingTopic, Long> {
}