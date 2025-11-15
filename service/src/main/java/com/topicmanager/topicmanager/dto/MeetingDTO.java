package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.entities.MeetingTopic;

import java.time.LocalDateTime;
import java.util.List;

public record MeetingDTO(
        Long id,
        String title,
        LocalDateTime startDate,
        LocalDateTime endDate,
        List<MeetingTopic>  topics,
        List<MeetingParticipantDTO> participants
) {
}
