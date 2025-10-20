package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingTopicRepository extends JpaRepository<MeetingTopic, Long> {

    List<MeetingTopic> findByMeetingId(Long meetingId);

    @Transactional
    void deleteByMeeting(Meeting meeting);
}