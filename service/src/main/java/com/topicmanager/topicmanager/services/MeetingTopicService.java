package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingTopicDTO;
import com.topicmanager.topicmanager.dto.SubtopicCreationWithMeetingDTO;
import com.topicmanager.topicmanager.dto.TopicCreationWithMeetingDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.repositories.MeetingTopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingTopicService {
    @Autowired
    MeetingTopicRepository meetingTopicRepository;

    public void createMeetingTopic(MeetingTopicDTO meetingTopicDTO) {
        MeetingTopic newMeetingTopic = new MeetingTopic(meetingTopicDTO);

        meetingTopicRepository.save(newMeetingTopic);

    }

    public void createMeetingTopic(Meeting meeting, TopicCreationWithMeetingDTO topic) {

        MeetingTopic newTopic = new MeetingTopic();
        newTopic.setMeeting(meeting);
        newTopic.setTitle(topic.title());
        newTopic.setDescription(topic.description());

        if (topic.subtopics() != null) {
            for (SubtopicCreationWithMeetingDTO subtopicDTO : topic.subtopics()) {
                MeetingTopic subtopic = new MeetingTopic();
                subtopic.setMeeting(meeting);
                subtopic.setTitle(subtopicDTO.title());
                subtopic.setDescription(subtopicDTO.description());
                subtopic.setParentTopic(newTopic);

                newTopic.getSubtopics().add(subtopic);
            }
        }

        meetingTopicRepository.save(newTopic);
    }

    public List<MeetingTopic> getMeetingTopicList() {
        return meetingTopicRepository.findAll();
    }

    public MeetingTopic getMeetingTopicById(Long id) {
        return meetingTopicRepository.findById(id).orElse(null);
    }

    public List<MeetingTopic> getMeetingTopicListByMeeting(Long meetingId) {
        return meetingTopicRepository.findByMeetingId(meetingId);
    }

    public void deleteAllByMeeting(Meeting savedMeeting) {
        meetingTopicRepository.deleteByMeeting(savedMeeting);
    }
}
