package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.entities.MeetingTopicFile;
import com.topicmanager.topicmanager.services.MeetingTopicFileService;
import com.topicmanager.topicmanager.services.MeetingTopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/meeting-topic-file")
public class MeetingTopicFileController {

    @Autowired
    MeetingTopicFileService meetingTopicFileService;

    @Autowired
    MeetingTopicService meetingTopicService;

    @PostMapping("{id}")
    public ResponseEntity saveTopicFile(@PathVariable Long id, @RequestPart List<MultipartFile> file) throws IOException {
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
}
