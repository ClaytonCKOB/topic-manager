package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.entities.MeetingTopicFile;
import com.topicmanager.topicmanager.services.MeetingTopicFileService;
import com.topicmanager.topicmanager.services.MeetingTopicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/meeting-topic-file")
@Tag(name = "Topic Files", description = "Meeting topic file upload endpoints")
public class MeetingTopicFileController {

    @Autowired
    MeetingTopicFileService meetingTopicFileService;

    @Autowired
    MeetingTopicService meetingTopicService;

    @PostMapping("/{id}")
    @Operation(summary = "Upload files to topic", description = "Upload one or more files to a meeting topic")
    public ResponseEntity saveTopicFile(
            @Parameter(description = "Topic ID") @PathVariable Long id,
            @RequestPart List<MultipartFile> file) throws IOException {
        MeetingTopic meetingTopic = meetingTopicService.getMeetingTopicById(id);
        for(MultipartFile multipartFile : file){
            MeetingTopicFile meetingTopicFile = new MeetingTopicFile();
            meetingTopicFile.setMeetingTopic(meetingTopic);
            meetingTopicFile.setFileName(multipartFile.getOriginalFilename());
            meetingTopicFile.setFileType(multipartFile.getContentType());
            meetingTopicFile.setFileData(multipartFile.getBytes());
            meetingTopicFileService.saveTopicFile(meetingTopicFile);
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{fileId}")
    @Operation(summary = "Delete file", description = "Delete a meeting topic file by ID")
    public ResponseEntity deleteTopicFile(
            @Parameter(description = "File ID") @PathVariable Long fileId) {
        try {
            meetingTopicFileService.deleteTopicFile(fileId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error deleting file: " + e.getMessage());
        }
    }
}
