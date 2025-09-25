package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingVoteDTO;
import com.topicmanager.topicmanager.entities.MeetingVote;
import com.topicmanager.topicmanager.repositories.MeetingVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingVoteService {

    @Autowired
    MeetingVoteRepository meetingVoteRepository;

    public void setMeetingVote(MeetingVoteDTO meetingVote) {
        MeetingVote existingMeetingVote = meetingVoteRepository.findByMeetingIdAndMeetingTopicIdAndUserId(meetingVote.meeting_id(), meetingVote.meeting_topic_id(), meetingVote.user_account_id());

        if (existingMeetingVote == null) {
            MeetingVote newMeetingVote = new MeetingVote(meetingVote);
            meetingVoteRepository.save(newMeetingVote);
        } else {
            existingMeetingVote.setStatus(meetingVote.status());
        }

    }

}
