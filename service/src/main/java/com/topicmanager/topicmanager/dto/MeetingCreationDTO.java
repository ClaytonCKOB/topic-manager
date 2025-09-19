package com.topicmanager.topicmanager.dto;

import java.time.LocalDateTime;

public record MeetingCreationDTO(
        String title,
        String description,

        LocalDateTime start_date,
        LocalDateTime end_date
) {
}
