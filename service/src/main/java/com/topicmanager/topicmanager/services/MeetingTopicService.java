package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingTopicDTO;
import com.topicmanager.topicmanager.dto.SubtopicCreationWithMeetingDTO;
import com.topicmanager.topicmanager.dto.TopicCreationWithMeetingDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.repositories.MeetingTopicFileRepository;
import com.topicmanager.topicmanager.repositories.MeetingTopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MeetingTopicService {
    @Autowired
    MeetingTopicRepository meetingTopicRepository;

    public MeetingTopic createMeetingTopic(MeetingTopicDTO meetingTopicDTO) {
        MeetingTopic newMeetingTopic = new MeetingTopic(meetingTopicDTO);

        meetingTopicRepository.save(newMeetingTopic);

        return newMeetingTopic;
    }

    public void createMeetingTopic(Meeting meeting, TopicCreationWithMeetingDTO topic) {
        MeetingTopic newTopic = new MeetingTopic();
        newTopic.setMeeting(meeting);
        newTopic.setTitle(topic.title());
        newTopic.setDescription(topic.description());

        if (topic.subtopics() != null) {
            for (SubtopicCreationWithMeetingDTO subDTO : topic.subtopics()) {
                MeetingTopic subtopic = new MeetingTopic();
                subtopic.setMeeting(meeting);
                subtopic.setTitle(subDTO.title());
                subtopic.setDescription(subDTO.description());
                subtopic.setParentTopic(newTopic);

                newTopic.getSubtopics().add(subtopic);
            }
        }

        if (meeting.getTopics() == null)
            meeting.setTopics(new ArrayList<>());

        meeting.getTopics().add(newTopic);

        meetingTopicRepository.save(newTopic);
    }

    public List<MeetingTopic> getMeetingTopicList() {
        return meetingTopicRepository.findAll();
    }

    public MeetingTopic getMeetingTopicById(Long id) {
        return meetingTopicRepository.findById(id).orElse(null);
    }

    public List<MeetingTopic> getMeetingTopicListByMeeting(Long meetingId) {
        return meetingTopicRepository.findByMeetingIdAndParentTopicIsNull(meetingId);
    }

    public void deleteAllByMeeting(Meeting savedMeeting) {
        meetingTopicRepository.deleteByMeeting(savedMeeting);
    }

    public void syncMeetingTopics(Meeting meeting, List<TopicCreationWithMeetingDTO> incomingTopics) {
        List<MeetingTopic> existingTopics = meetingTopicRepository.findByMeetingId(meeting.getId())
                .stream()
                .filter(t -> t.getParentTopic() == null)
                .collect(Collectors.toList());

        Map<Long, MeetingTopic> existingMap = existingTopics.stream()
                .collect(Collectors.toMap(MeetingTopic::getId, t -> t));

        Set<Long> processedIds = new HashSet<>();

        for (TopicCreationWithMeetingDTO topicDTO : incomingTopics) {
            if (topicDTO.id() != null && existingMap.containsKey(topicDTO.id())) {
                MeetingTopic existingTopic = existingMap.get(topicDTO.id());
                existingTopic.setTitle(topicDTO.title());
                existingTopic.setDescription(topicDTO.description());

                syncSubtopics(existingTopic, topicDTO.subtopics());

                meetingTopicRepository.save(existingTopic);
                processedIds.add(topicDTO.id());
            } else {
                createMeetingTopic(meeting, topicDTO);
            }
        }

        for (MeetingTopic existingTopic : existingTopics) {
            if (!processedIds.contains(existingTopic.getId())) {
                if (!existingTopic.getVotes().isEmpty()) {
                    throw new IllegalStateException(
                            "Cannot delete topic '" + existingTopic.getTitle() +
                                    "' because it has " + existingTopic.getVotes().size() + " votes"
                    );
                }
                meetingTopicRepository.delete(existingTopic);
            }
        }
    }

    private void syncSubtopics(MeetingTopic parentTopic, List<SubtopicCreationWithMeetingDTO> incomingSubtopics) {
        if (incomingSubtopics == null || incomingSubtopics.isEmpty()) {
            for (MeetingTopic subtopic : parentTopic.getSubtopics()) {
                if (!subtopic.getVotes().isEmpty()) {
                    throw new IllegalStateException(
                            "Cannot delete subtopic '" + subtopic.getTitle() + "' because it has votes"
                    );
                }
            }
            parentTopic.getSubtopics().clear();
            return;
        }

        Map<Long, MeetingTopic> existingSubtopicsMap = parentTopic.getSubtopics().stream()
                .collect(Collectors.toMap(MeetingTopic::getId, s -> s));

        Set<Long> processedSubtopicIds = new HashSet<>();
        List<MeetingTopic> updatedSubtopics = new ArrayList<>();

        for (SubtopicCreationWithMeetingDTO subDTO : incomingSubtopics) {
            if (subDTO.id() != null && existingSubtopicsMap.containsKey(subDTO.id())) {
                MeetingTopic existingSubtopic = existingSubtopicsMap.get(subDTO.id());
                existingSubtopic.setTitle(subDTO.title());
                existingSubtopic.setDescription(subDTO.description());
                updatedSubtopics.add(existingSubtopic);
                processedSubtopicIds.add(subDTO.id());
            } else {
                MeetingTopic newSubtopic = new MeetingTopic();
                newSubtopic.setMeeting(parentTopic.getMeeting());
                newSubtopic.setParentTopic(parentTopic);
                newSubtopic.setTitle(subDTO.title());
                newSubtopic.setDescription(subDTO.description());
                updatedSubtopics.add(newSubtopic);
            }
        }

        for (MeetingTopic existingSub : parentTopic.getSubtopics()) {
            if (!processedSubtopicIds.contains(existingSub.getId())) {
                if (!existingSub.getVotes().isEmpty()) {
                    throw new IllegalStateException(
                            "Cannot delete subtopic '" + existingSub.getTitle() + "' because it has votes"
                    );
                }
            }
        }

        parentTopic.getSubtopics().clear();
        parentTopic.getSubtopics().addAll(updatedSubtopics);
    }
}
