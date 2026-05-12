package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingBasicDTO;
import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import com.topicmanager.topicmanager.dto.MeetingDTO;
import com.topicmanager.topicmanager.dto.MeetingListDTO;
import com.topicmanager.topicmanager.dto.MeetingParticipantDTO;
import com.topicmanager.topicmanager.dto.TopicCreationWithMeetingDTO;
import com.topicmanager.topicmanager.dto.VotingStatsDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.entities.TopicVote;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.repositories.MeetingRepository;
import com.topicmanager.topicmanager.repositories.TopicVoteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

    @Transactional
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

        return savedMeeting;
    }

    public void updateMeeting(Long meetingId, MeetingCreationDTO meeting) {
        Meeting existingMeeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found with id: " + meetingId));

        existingMeeting.setTitle(meeting.title());
        existingMeeting.setStartDate(meeting.start_date());
        existingMeeting.setEndDate(meeting.end_date());

        Meeting savedMeeting = meetingRepository.save(existingMeeting);

        meetingTopicService.syncMeetingTopics(savedMeeting, meeting.topics());
    }

    public List<MeetingListDTO> getMeetingList() {
        List<Meeting> meetings = meetingRepository.findAll();
        return meetings.stream()
                .map(meeting -> new MeetingListDTO(
                        meeting.getId(),
                        meeting.getTitle(),
                        meeting.getStartDate(),
                        meeting.getEndDate(),
                        meeting.getTopics() != null ? meeting.getTopics().size() : 0
                ))
                .toList();
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

    public MeetingBasicDTO getMeetingBasic(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        return new MeetingBasicDTO(
                meeting.getId(),
                meeting.getTitle(),
                meeting.getStartDate(),
                meeting.getEndDate()
        );
    }

    private MeetingDTO getMeetingDTO(Meeting meeting) {
        List<MeetingParticipantDTO> meetingParticipants = new ArrayList<>();

        meeting.getParticipants().
                stream().
                forEach(participant -> {
            meetingParticipants.add(new MeetingParticipantDTO(participant.getId().getUserAccountId(), participant.getId().getMeetingId(), participant.getUser().getUsername(), participant.getUser().getName(), participant.getRole()));
        });

        return new MeetingDTO(meeting.getId(), meeting.getTitle(), meeting.getStartDate(), meeting.getEndDate(), meeting.getTopics(), meetingParticipants);
    }

    public Meeting getMeeting(Long meetingId) {
        return meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found with id: " + meetingId));
    }

    public VotingStatsDTO getVotingStats(Long meetingId) {
        Meeting meeting = getMeeting(meetingId);

        int totalParticipants = meeting.getParticipants().size();

        List<MeetingTopic> allTopics = meetingTopicService.getMeetingTopicListByMeeting(meetingId);
        List<MeetingTopic> flatTopics = new ArrayList<>();
        flattenTopics(allTopics, flatTopics);
        int totalTopics = flatTopics.size();

        int totalVotesCast = flatTopics.stream()
            .mapToInt(topic -> topic.getVotes().size())
            .sum();

        int totalExpectedVotes = totalParticipants * totalTopics;
        int totalVotesPending = totalExpectedVotes - totalVotesCast;

        return new VotingStatsDTO(
            totalParticipants,
            totalTopics,
            totalExpectedVotes,
            totalVotesCast,
            totalVotesPending
        );
    }

    private void flattenTopics(List<MeetingTopic> topics, List<MeetingTopic> result) {
        for (MeetingTopic topic : topics) {
            result.add(topic);
            if (topic.getSubtopics() != null && !topic.getSubtopics().isEmpty()) {
                flattenTopics(topic.getSubtopics(), result);
            }
        }
    }
}
