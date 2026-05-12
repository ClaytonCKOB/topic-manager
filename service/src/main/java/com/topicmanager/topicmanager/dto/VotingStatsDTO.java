package com.topicmanager.topicmanager.dto;

public record VotingStatsDTO(
    Integer totalParticipants,
    Integer totalTopics,
    Integer totalExpectedVotes,
    Integer totalVotesCast,
    Integer totalVotesPending
) {}
