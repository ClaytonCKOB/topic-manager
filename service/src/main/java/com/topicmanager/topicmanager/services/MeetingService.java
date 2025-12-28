package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import com.topicmanager.topicmanager.dto.MeetingDTO;
import com.topicmanager.topicmanager.dto.MeetingParticipantDTO;
import com.topicmanager.topicmanager.dto.TopicCreationWithMeetingDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.TopicVote;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.repositories.MeetingRepository;
import com.topicmanager.topicmanager.repositories.TopicVoteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    TopicVoteRepository topicVoteRepository;

    @Autowired
    MeetingTopicService meetingTopicService;

    @Autowired
    MeetingParticipantService meetingParticipantService;

    @Autowired
    UserAccountService userAccountService;

    public Meeting createMeeting(MeetingCreationDTO meeting) {
        Meeting newMeeting = new Meeting(meeting);

        Meeting savedMeeting = meetingRepository.save(newMeeting);

        List<UserAccount> meetingParticipants = userAccountService.listNotAdminUsers();

        for (UserAccount userAccount : meetingParticipants){
            meetingParticipantService.createMeetingParticipant(userAccount, savedMeeting.getId());
        }

        for (TopicCreationWithMeetingDTO topic : meeting.topics()) {
            meetingTopicService.createMeetingTopic(savedMeeting, topic);
        }

        return newMeeting;
    }

    public void updateMeeting(Long meetingId, MeetingCreationDTO meeting) {
        Meeting existingMeeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found with id: " + meetingId));

        existingMeeting.setTitle(meeting.title());
        existingMeeting.setStartDate(meeting.start_date());
        existingMeeting.setEndDate(meeting.end_date());

        Meeting savedMeeting = meetingRepository.save(existingMeeting);

        // TODO: should not delete all the topics, since it could have votes
        // or block edit when there is already a vote
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

    public MeetingDTO getMeetingById(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        meeting.setTopics(meeting.getTopics().stream().filter(t -> t.getParentTopic() == null).toList());

        return getMeetingDTO(meeting);

    }

    private MeetingDTO getMeetingDTO(Meeting meeting) {
        List<MeetingParticipantDTO> meetingParticipants = new ArrayList<>();

        List<TopicVote> topicVotes = topicVoteRepository.findAll();

        meeting.getParticipants().
                stream().
                filter(p -> !topicVotes.stream().filter(v -> v.getUser().getId().equals(p.getUser().getId()) && v.getMeetingTopic().getMeeting().getId().equals(meeting.getId())).toList().isEmpty()).
                forEach(participant -> {
            meetingParticipants.add(new MeetingParticipantDTO(participant.getId().getUserAccountId(), participant.getId().getMeetingId(), participant.getUser().getUsername(), participant.getRole()));
        });

        return new MeetingDTO(meeting.getId(), meeting.getTitle(), meeting.getStartDate(), meeting.getEndDate(), meeting.getTopics(), meetingParticipants);
    }
}
