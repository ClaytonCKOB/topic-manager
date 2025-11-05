package com.topicmanager.topicmanager.dto;

import com.topicmanager.topicmanager.entities.MeetingParticipant;
import com.topicmanager.topicmanager.entities.MeetingStatus;
import com.topicmanager.topicmanager.entities.MeetingTopic;

import java.time.LocalDateTime;
import java.util.List;

public record MeetingDTO(
        Long id,
        MeetingStatus status,
        String title,
        String description,
        LocalDateTime startDate,
        LocalDateTime endDate,
        List<MeetingTopic>  topics,
        List<MeetingParticipantDTO> participants
) {
}
