package com.topicmanager.topicmanager.dto;

public record CreateMeetingParticipantDTO(
        Long meeting_id,
        Long user_account_id
) {
}
