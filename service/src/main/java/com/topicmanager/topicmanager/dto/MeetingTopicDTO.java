package com.topicmanager.topicmanager.dto;

public record MeetingTopicDTO(
        Long meeting_id,

        Long meeting_topic_id,

        String title,

        String description
) {
}
