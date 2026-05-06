package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.entities.MeetingTopicFile;
import com.topicmanager.topicmanager.repositories.MeetingTopicFileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MeetingTopicFileService {
    @Autowired
    MeetingTopicFileRepository meetingTopicFileRepository;

    public void saveTopicFile(MeetingTopicFile meetingTopicFile) {
        meetingTopicFileRepository.save(meetingTopicFile);
    }

    @Transactional
    public void deleteTopicFile(Long fileId) {
        MeetingTopicFile fileToDelete = meetingTopicFileRepository.findById(fileId)
                .orElseThrow(() -> new EntityNotFoundException("File not found with id: " + fileId));

        MeetingTopic topic = fileToDelete.getMeetingTopic();
        topic.getFiles().remove(fileToDelete);
    }
}
