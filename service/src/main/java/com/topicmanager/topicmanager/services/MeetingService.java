package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.repositories.MeetingRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    public void createMeeting(MeetingCreationDTO meeting) {
        Meeting newMeeting = new Meeting(meeting);

        meetingRepository.save(newMeeting);
    }

    public List<Meeting> getMeetingList() {
        return meetingRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Meeting getMeetingById(Long id) {
        return meetingRepository.findByIdWithTopics(id)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));
    }
}
