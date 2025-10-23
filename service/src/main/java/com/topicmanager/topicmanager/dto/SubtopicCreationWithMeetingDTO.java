package com.topicmanager.topicmanager.dto;

import java.util.List;

public record SubtopicCreationWithMeetingDTO(

        String title,

        String description,

        List<FileDTO> files
) {
}
