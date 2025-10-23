package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.TopicVoteDTO;
import com.topicmanager.topicmanager.services.TopicVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/meeting-vote")
public class TopicVoteController {
    @Autowired
    TopicVoteService topicVoteService;

    @PostMapping
    public ResponseEntity setTopicVote(@RequestBody TopicVoteDTO topicVoteDTO) {
        topicVoteService.setTopicVote(topicVoteDTO);

        return ResponseEntity.ok().build();
    }

}
