package com.topicmanager.topicmanager.dto;

import java.time.LocalDateTime;

public record MeetingBasicDTO(
        Long id,
        String title,
        LocalDateTime startDate,
        LocalDateTime endDate
) {
}
