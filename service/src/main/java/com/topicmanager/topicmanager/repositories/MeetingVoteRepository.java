package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.MeetingVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingVoteRepository extends JpaRepository<MeetingVote, Long> {
}
