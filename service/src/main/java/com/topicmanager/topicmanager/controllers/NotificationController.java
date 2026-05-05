package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.services.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notify")
@Tag(name = "Notifications", description = "Notification and email endpoints")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/test")
    @Operation(summary = "Test email service", description = "Send a test email to verify email configuration")
    public ResponseEntity testEmail() {
        try {
            notificationService.sendHtml(
                    "test@gmail.com",
                    "Test Email",
                    "<h1>Hello from TopicManager!</h1><p>This is a test email.</p>"
            );
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().build();
        }
    }
}

