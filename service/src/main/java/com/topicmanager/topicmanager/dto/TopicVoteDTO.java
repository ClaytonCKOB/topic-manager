package com.topicmanager.topicmanager.dto;

public record TopicVoteDTO(
        Long user_account_id,
        Long meeting_topic_id,
        String comment,
        Integer status
) {
}
