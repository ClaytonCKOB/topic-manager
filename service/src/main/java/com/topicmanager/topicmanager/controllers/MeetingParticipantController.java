package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.CreateMeetingParticipantDTO;
import com.topicmanager.topicmanager.services.MeetingParticipantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/meeting-participant")
@Tag(name = "Meeting Participants", description = "Meeting participant management endpoints")
public class MeetingParticipantController {

    @Autowired
    MeetingParticipantService meetingParticipantService;

    @PostMapping
    @Operation(summary = "Add participant to meeting", description = "Add a user as a participant to a meeting")
    public ResponseEntity createMeetingParticipant(@RequestBody CreateMeetingParticipantDTO meetingParticipantDTO) {
        meetingParticipantService.createMeetingParticipant(meetingParticipantDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
