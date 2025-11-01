package com.topicmanager.topicmanager.dto;

public record FileDTO(
        String fileName,
        String fileType,
        byte[] fileData
) {}
