package com.topicmanager.topicmanager.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "meeting_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_status_id")
    private Long id;

    @Column(nullable = false)
    private String description;

    public MeetingStatus(Long code) {
        this.id = code;
    }
}