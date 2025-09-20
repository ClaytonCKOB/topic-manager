package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.MeetingVoteDTO;
import com.topicmanager.topicmanager.services.MeetingVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/meeting-vote")
public class MeetingVoteController {
    @Autowired
    MeetingVoteService meetingVoteService;

    public ResponseEntity setMeetingVote(@RequestBody MeetingVoteDTO meetingVoteDTO) {
        meetingVoteService.setMeetingVote(meetingVoteDTO);

        return ResponseEntity.ok().build();
    }

}
