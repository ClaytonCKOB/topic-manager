package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.enums.UserAccountRole;

public record RegisterDTO(
        String username,
        String password,
        UserAccountRole role
) {
}
