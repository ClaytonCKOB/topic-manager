package com.topicmanager.topicmanager.dto;

import java.time.LocalDateTime;

public record MeetingListDTO(
        Long id,
        String title,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer topicCount
) {
}
