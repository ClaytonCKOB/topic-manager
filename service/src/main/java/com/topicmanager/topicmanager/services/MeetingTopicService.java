package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingTopicDTO;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.repositories.MeetingTopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    public List<MeetingTopic> getMeetingTopicList() {
        return meetingTopicRepository.findAll();
    }

    public MeetingTopic getMeetingTopicById(Long id) {
        return meetingTopicRepository.findById(id).orElse(null);
    }

    public List<MeetingTopic> getMeetingTopicListByMeeting(Long meetingId) {
        return meetingTopicRepository.findByMeetingId(meetingId);
    }
}
