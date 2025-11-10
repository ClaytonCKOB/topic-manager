package com.topicmanager.topicmanager.dto;

public record RegisterInviteDTO(
        String invitation_id,
        String username,
        String password,
        String name,
        String email
) {
}
