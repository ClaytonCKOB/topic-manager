package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.enums.UserAccountRole;

import java.time.LocalDateTime;

public record UserInviteDTO(
        Long sender_id,
        String email,
        String password,
        UserAccountRole role,
        Boolean active,
        LocalDateTime createdDate
) {
}
