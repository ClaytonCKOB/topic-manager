package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.MeetingTopicDTO;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.services.MeetingTopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/meeting-topic")
public class MeetingTopicController {

    @Autowired
    MeetingTopicService meetingTopicService;

    @PostMapping
    public ResponseEntity createMeetingTopic(@RequestBody MeetingTopicDTO meetingTopicDTO) {
        meetingTopicService.createMeetingTopic(meetingTopicDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<MeetingTopic>> getMeetingTopicList() {
        return ResponseEntity.ok(meetingTopicService.getMeetingTopicList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeetingTopic> getMeetingTopic(@PathVariable Long id) {
        return ResponseEntity.ok(meetingTopicService.getMeetingTopicById(id));
    }

    @GetMapping("/meeting/{meetingId}")
    public ResponseEntity<List<MeetingTopic>> getMeetingTopicListByMeeting(@PathVariable Long meetingId) {
        return ResponseEntity.ok(meetingTopicService.getMeetingTopicListByMeeting(meetingId));
    }

}
