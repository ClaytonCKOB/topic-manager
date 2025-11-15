package com.topicmanager.topicmanager.dto;

import java.util.List;

public record TopicCreationWithMeetingDTO(

        String title,

        String description,

        List<FileDTO> files,

        List<SubtopicCreationWithMeetingDTO> subtopics
) {
}
