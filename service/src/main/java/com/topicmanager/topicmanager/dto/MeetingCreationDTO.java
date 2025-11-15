package com.topicmanager.topicmanager.dto;

import java.time.LocalDateTime;
import java.util.List;

public record MeetingCreationDTO(
        String title,
        LocalDateTime start_date,
        LocalDateTime end_date,
        List<TopicCreationWithMeetingDTO> topics
) {
}
