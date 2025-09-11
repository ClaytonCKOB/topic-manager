package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.MeetingDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.services.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/meeting")
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @PostMapping
    public ResponseEntity createMeeting(@RequestBody MeetingDTO meetingDTO) {
        meetingService.createMeeting(meetingDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Meeting>> getMeetingList() {
        return ResponseEntity.ok(meetingService.getMeetingList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeeting(@PathVariable Long id) {
        Meeting meeting = meetingService.getMeetingById(id).orElse(null);
        return ResponseEntity.ok(meeting);
    }

}
