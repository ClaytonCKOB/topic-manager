package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.MeetingBasicDTO;
import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import com.topicmanager.topicmanager.dto.MeetingDTO;
import com.topicmanager.topicmanager.dto.MeetingListDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.services.MeetingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/meeting")
@Tag(name = "Meetings", description = "Meeting management endpoints")
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @PostMapping
    @Operation(summary = "Create meeting", description = "Create a new meeting")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Meeting created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid meeting data")
    })
    public ResponseEntity<Meeting> createMeeting(@RequestBody MeetingCreationDTO meetingDTO) {
        Meeting meeting = meetingService.createMeeting(meetingDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(meeting);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update meeting", description = "Update an existing meeting")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meeting updated successfully"),
            @ApiResponse(responseCode = "404", description = "Meeting not found")
    })
    public ResponseEntity updateMeeting(
            @Parameter(description = "Meeting ID") @PathVariable Long id,
            @RequestBody MeetingCreationDTO meetingDTO) {
        meetingService.updateMeeting(id, meetingDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "List all meetings", description = "Get a list of all meetings")
    @ApiResponse(responseCode = "200", description = "List retrieved successfully")
    public ResponseEntity<List<MeetingListDTO>> getMeetingList() {
        List<MeetingListDTO> meetingList = meetingService.getMeetingList();
        return ResponseEntity.ok(meetingList);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get meeting by ID", description = "Get detailed information about a specific meeting")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meeting found"),
            @ApiResponse(responseCode = "404", description = "Meeting not found")
    })
    public ResponseEntity<MeetingDTO> getMeeting(
            @Parameter(description = "Meeting ID") @PathVariable Long id) {
        MeetingDTO meeting = meetingService.getMeetingById(id);
        return ResponseEntity.ok(meeting);
    }

    @GetMapping("/{id}/basic")
    @Operation(summary = "Get meeting basic info", description = "Get basic meeting information without topics and participants")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meeting found"),
            @ApiResponse(responseCode = "404", description = "Meeting not found")
    })
    public ResponseEntity<MeetingBasicDTO> getMeetingBasic(
            @Parameter(description = "Meeting ID") @PathVariable Long id) {
        MeetingBasicDTO meeting = meetingService.getMeetingBasic(id);
        return ResponseEntity.ok(meeting);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete meeting", description = "Delete a meeting by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meeting deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Meeting not found")
    })
    public ResponseEntity deleteMeeting(
            @Parameter(description = "Meeting ID") @PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.ok().build();
    }
}
