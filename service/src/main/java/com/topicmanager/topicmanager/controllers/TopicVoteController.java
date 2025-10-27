package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.TopicVoteDTO;
import com.topicmanager.topicmanager.entities.TopicVote;
import com.topicmanager.topicmanager.services.TopicVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/topic-vote")
public class TopicVoteController {
    @Autowired
    TopicVoteService topicVoteService;

    @PostMapping
    public ResponseEntity setTopicVote(@RequestBody TopicVoteDTO topicVoteDTO) {
        topicVoteService.setTopicVote(topicVoteDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<TopicVote>> getTopicVotes(@PathVariable Long id) {
        List<TopicVote> topicVotes = topicVoteService.getTopicVotesByTopicId(id);
        return ResponseEntity.ok(topicVotes);
    }
}
