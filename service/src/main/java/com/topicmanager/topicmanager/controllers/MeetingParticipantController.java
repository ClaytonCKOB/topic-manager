package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.CreateMeetingParticipantDTO;
import com.topicmanager.topicmanager.services.MeetingParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/meeting-participant")
public class MeetingParticipantController {

    @Autowired
    MeetingParticipantService meetingParticipantService;

    @PostMapping
    public ResponseEntity createMeetingParticipant(@RequestBody CreateMeetingParticipantDTO meetingParticipantDTO) {
        meetingParticipantService.createMeetingParticipant(meetingParticipantDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
