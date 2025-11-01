package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.entities.MeetingTopicFile;
import com.topicmanager.topicmanager.repositories.MeetingTopicFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingTopicFileService {
    @Autowired
    MeetingTopicFileRepository meetingTopicFileRepository;

    public void saveTopicFile(MeetingTopicFile meetingTopicFile) {
        meetingTopicFileRepository.save(meetingTopicFile);
    }
}
