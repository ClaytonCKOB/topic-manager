package com.topicmanager.topicmanager.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "meeting_topic")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_topic_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @Column(nullable = false)
    private String title;

    private String description;
}
