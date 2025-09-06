package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}
