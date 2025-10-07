package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import com.topicmanager.topicmanager.dto.TopicCreationWithMeetingDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.repositories.MeetingRepository;
import com.topicmanager.topicmanager.repositories.UserAccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    MeetingTopicService meetingTopicService;

    @Autowired
    MeetingParticipantService meetingParticipantService;

    @Autowired
    UserAccountService userAccountService;

    public void createMeeting(MeetingCreationDTO meeting) {
        Meeting newMeeting = new Meeting(meeting);

        Meeting savedMeeting = meetingRepository.save(newMeeting);

        List<UserAccount> meetingParticipants = userAccountService.list();

        for (UserAccount userAccount : meetingParticipants){
            meetingParticipantService.createMeetingParticipant(userAccount, savedMeeting.getId());
        }

        for (TopicCreationWithMeetingDTO topic : meeting.topics()) {
            meetingTopicService.createMeetingTopic(savedMeeting, topic);
        }

    }

    public List<Meeting> getMeetingList() {
        return meetingRepository.findAll();
    }

    public Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));
    }
}
