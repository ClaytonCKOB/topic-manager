package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.MeetingTopicFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingTopicFileRepository extends JpaRepository<MeetingTopicFile, Long> {
}