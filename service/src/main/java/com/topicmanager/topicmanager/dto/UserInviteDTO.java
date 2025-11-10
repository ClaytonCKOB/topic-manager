package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.enums.UserAccountRole;

public record UserInviteDTO(
        Long sender_id,
        String email,
        UserAccountRole role
) {
}
