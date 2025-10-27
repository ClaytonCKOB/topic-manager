package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.TopicVoteDTO;
import com.topicmanager.topicmanager.entities.TopicVote;
import com.topicmanager.topicmanager.repositories.TopicVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicVoteService {

    @Autowired
    TopicVoteRepository topicVoteRepository;

    public void setTopicVote(TopicVoteDTO topicVote) {
        TopicVote existingTopicVote = topicVoteRepository.findByMeetingTopicIdAndUserId(topicVote.meeting_topic_id(), topicVote.user_account_id());

        if (existingTopicVote == null) {
            TopicVote newTopicVote = new TopicVote(topicVote);
            topicVoteRepository.save(newTopicVote);
        } else {
            existingTopicVote.setStatus(topicVote.status());
            existingTopicVote.setComment(topicVote.comment());
            topicVoteRepository.save(existingTopicVote);
        }
    }

    public List<TopicVote> getTopicVotesByTopicId(Long topicId) {
        return topicVoteRepository.findByMeetingTopicId(topicId);
    }

}
