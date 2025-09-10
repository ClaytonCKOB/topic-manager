package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.enums.UserAccountRole;

public record LoginResponseDTO(
        String token,
        UserAccountRole role
) {
}
