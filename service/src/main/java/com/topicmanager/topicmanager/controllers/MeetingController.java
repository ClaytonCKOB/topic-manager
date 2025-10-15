package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
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
    public ResponseEntity createMeeting(@RequestBody MeetingCreationDTO meetingDTO) {
        meetingService.createMeeting(meetingDTO);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity createMeeting(@PathVariable Long id, @RequestBody MeetingCreationDTO meetingDTO) {
        meetingService.updateMeeting(id, meetingDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Meeting>> getMeetingList() {
        return ResponseEntity.ok(meetingService.getMeetingList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeeting(@PathVariable Long id) {
        try {
            Meeting meeting = meetingService.getMeetingById(id);
            return ResponseEntity.ok(meeting);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMeeting(@PathVariable Long id) {
        try {
            meetingService.deleteMeeting(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
