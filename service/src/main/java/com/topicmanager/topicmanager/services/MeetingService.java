package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.MeetingDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.repositories.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    public void createMeeting(MeetingDTO meeting) {
        Meeting newMeeting = new Meeting(meeting);

        meetingRepository.save(newMeeting);
    }

    public List<Meeting> getMeetingList() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> getMeetingById(Long id) {
        return meetingRepository.findById(id);
    }
}
