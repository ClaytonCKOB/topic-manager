package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import com.topicmanager.topicmanager.dto.MeetingDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.services.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/meeting")
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@RequestBody MeetingCreationDTO meetingDTO) {
        Meeting meeting = meetingService.createMeeting(meetingDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(meeting);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateMeeting(@PathVariable Long id, @RequestBody MeetingCreationDTO meetingDTO) {
        meetingService.updateMeeting(id, meetingDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Meeting>> getMeetingList() {
        List<Meeting> meetingList = meetingService.getMeetingList();
        return ResponseEntity.ok(meetingList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeetingDTO> getMeeting(@PathVariable Long id) {
        MeetingDTO meeting = meetingService.getMeetingById(id);
        return ResponseEntity.ok(meeting);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.ok().build();
    }
}
