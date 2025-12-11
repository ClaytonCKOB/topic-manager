package com.topicmanager.topicmanager.dto;

import java.time.LocalDateTime;

public record ActionItemDTO(
        Long actionItemId,
        Long meetingTopicId,
        String meetingTopicTitle,
        Long meetingId,
        String meetingTitle,
        String senderName,
        String comment,
        LocalDateTime createdDate
) {
}
