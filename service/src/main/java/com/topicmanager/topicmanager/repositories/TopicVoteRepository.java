package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.TopicVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TopicVoteRepository extends JpaRepository<TopicVote, Long> {

    TopicVote findByMeetingTopicIdAndUserId(Long topicId, Long userId);

    List<TopicVote> findByMeetingTopicId(Long topicId);
}
