package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.entities.ids.MeetingParticipantId;
import com.topicmanager.topicmanager.enums.UserAccountRole;

public record MeetingParticipantDTO(
        Long id,
        Long meeting_id,
        String username,
        UserAccountRole role
) {
}
