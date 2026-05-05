package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.MeetingTopicDTO;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.services.MeetingTopicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/meeting-topic")
@Tag(name = "Meeting Topics", description = "Meeting topic management endpoints")
public class MeetingTopicController {

    @Autowired
    MeetingTopicService meetingTopicService;

    @PostMapping
    @Operation(summary = "Create meeting topic", description = "Create a new topic for a meeting")
    public ResponseEntity<MeetingTopic> createMeetingTopic(@RequestBody MeetingTopicDTO meetingTopicDTO) {
        MeetingTopic created = meetingTopicService.createMeetingTopic(meetingTopicDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    @Operation(summary = "List all topics", description = "Get a list of all meeting topics")
    public ResponseEntity<List<MeetingTopic>> getMeetingTopicList() {
        return ResponseEntity.ok(meetingTopicService.getMeetingTopicList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get topic by ID", description = "Get a specific meeting topic by ID")
    public ResponseEntity<MeetingTopic> getMeetingTopic(
            @Parameter(description = "Topic ID") @PathVariable Long id) {
        MeetingTopic topic = meetingTopicService.getMeetingTopicById(id);
        return ResponseEntity.ok(topic);
    }

    @GetMapping("/meeting/{meetingId}")
    @Operation(summary = "Get topics by meeting", description = "Get all topics for a specific meeting")
    public ResponseEntity<List<MeetingTopic>> getMeetingTopicListByMeeting(
            @Parameter(description = "Meeting ID") @PathVariable Long meetingId) {
        return ResponseEntity.ok(meetingTopicService.getMeetingTopicListByMeeting(meetingId));
    }
}

