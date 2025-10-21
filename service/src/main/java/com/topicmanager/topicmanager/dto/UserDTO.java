package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.enums.UserAccountRole;

public record UserDTO(
    String name,
    String username,
    String email,
    UserAccountRole role,
    Boolean active
) {
}
