package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.CreateMeetingParticipantDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.MeetingParticipant;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import com.topicmanager.topicmanager.repositories.MeetingRepository;
import com.topicmanager.topicmanager.repositories.UserAccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.BeanDefinitionDsl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class MeetingParticipantService {

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    UserAccountRepository userAccountRepository;

    public void createMeetingParticipant(CreateMeetingParticipantDTO dto) {
        Meeting meeting = meetingRepository.findById(dto.meeting_id())
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        UserAccount user = userAccountRepository.findById(dto.user_account_id())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        meeting.getParticipants().add(new MeetingParticipant(user, meeting));

        meetingRepository.save(meeting);
    }

    public void createMeetingParticipant(UserAccount userAccount, Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        UserAccount user = userAccountRepository.findById(userAccount.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (meeting.getParticipants() == null) {
            meeting.setParticipants(new ArrayList<>(Arrays.asList(new MeetingParticipant(user, meeting))));
        } else {
            meeting.getParticipants().add(new MeetingParticipant(user, meeting));
        }

        meetingRepository.save(meeting);
    }

    public UserAccount getMeetingBossById(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(() -> new EntityNotFoundException("Meeting not found"));
        MeetingParticipant boss = meeting.getParticipants()
                .stream()
                .filter(participant -> participant.getRole().equals(UserAccountRole.CHEFE))
                .toList()
                .get(0);

        return boss.getUser();
    }
}
