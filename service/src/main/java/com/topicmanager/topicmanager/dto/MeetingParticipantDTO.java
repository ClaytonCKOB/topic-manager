package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.enums.UserAccountRole;

public record MeetingParticipantDTO(
        Long id,
        Long meeting_id,
        String username,
        UserAccountRole role
) {
}
