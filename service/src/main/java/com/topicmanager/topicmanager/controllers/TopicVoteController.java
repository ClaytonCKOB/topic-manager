package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.TopicVoteDTO;
import com.topicmanager.topicmanager.entities.TopicVote;
import com.topicmanager.topicmanager.services.TopicVoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/topic-vote")
@Tag(name = "Topic Votes", description = "Topic voting endpoints")
public class TopicVoteController {
    @Autowired
    TopicVoteService topicVoteService;

    @PostMapping
    @Operation(summary = "Vote on topic", description = "Submit or update a vote on a meeting topic")
    public ResponseEntity setTopicVote(@RequestBody TopicVoteDTO topicVoteDTO) {
        topicVoteService.setTopicVote(topicVoteDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get votes for topic", description = "Get all votes for a specific topic")
    public ResponseEntity<List<TopicVote>> getTopicVotes(
            @Parameter(description = "Topic ID") @PathVariable Long id) {
        List<TopicVote> topicVotes = topicVoteService.getTopicVotesByTopicId(id);
        return ResponseEntity.ok(topicVotes);
    }
}
