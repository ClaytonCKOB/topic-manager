package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.MeetingVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingVoteRepository extends JpaRepository<MeetingVote, Long> {

    MeetingVote findByMeetingIdAndTopicIdAndUserId(Long meetingId, Long topicId, Long userId);
}
