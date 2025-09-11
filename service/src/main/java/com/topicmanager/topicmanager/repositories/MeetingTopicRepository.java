package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.MeetingTopic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingTopicRepository extends JpaRepository<MeetingTopic, Long> {

    List<MeetingTopic> findByMeetingId(Long meetingId);
}