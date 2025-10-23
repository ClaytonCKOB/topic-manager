package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.TopicVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicVoteRepository extends JpaRepository<TopicVote, Long> {

    TopicVote findByMeetingTopicIdAndUserId(Long topicId, Long userId);
}
