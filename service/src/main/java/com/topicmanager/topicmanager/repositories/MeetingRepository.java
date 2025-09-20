package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

}
