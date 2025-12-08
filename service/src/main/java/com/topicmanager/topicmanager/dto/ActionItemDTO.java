package com.topicmanager.topicmanager.dto;

import java.time.LocalDateTime;

public record ActionItemDTO(
        Long actionItemId,
        Long meetingTopicId,
        Long senderId,
        Long actorId,
        String comment,
        Boolean completed,
        LocalDateTime createdDate,
        LocalDateTime completedDate
) {
}
