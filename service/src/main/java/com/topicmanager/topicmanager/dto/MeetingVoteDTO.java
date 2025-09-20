package com.topicmanager.topicmanager.dto;

public record MeetingVoteDTO(
        Long meeting_id,
        Long user_account_id,
        Long meeting_topic_id,
        Integer status
) {
}
