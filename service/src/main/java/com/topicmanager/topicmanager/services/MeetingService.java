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

    public void updateMeeting(Long meetingId, MeetingCreationDTO meeting) {
        Meeting existingMeeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found with id: " + meetingId));

        existingMeeting.setTitle(meeting.title());
        existingMeeting.setDescription(meeting.description());
        existingMeeting.setStartDate(meeting.start_date());
        existingMeeting.setEndDate(meeting.end_date());

        Meeting savedMeeting = meetingRepository.save(existingMeeting);

        meetingTopicService.deleteAllByMeeting(savedMeeting);

        for (TopicCreationWithMeetingDTO topicDTO : meeting.topics()) {
            meetingTopicService.createMeetingTopic(savedMeeting, topicDTO);
        }
    }

    public List<Meeting> getMeetingList() {
        return meetingRepository.findAll();
    }

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }

    public Meeting getMeetingById(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        meeting.setTopics(meeting.getTopics().stream().filter(t -> t.getParentTopic() == null).toList());

        return meeting;

    }
}
