package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.MeetingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingStatusRepository extends JpaRepository<MeetingStatus, Long> {
}