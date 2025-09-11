package com.topicmanager.topicmanager.entities;

import com.topicmanager.topicmanager.dto.MeetingTopicDTO;
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

    public MeetingTopic(MeetingTopicDTO meetingTopicDTO) {
        this.meeting = new Meeting(meetingTopicDTO.meeting_id());
        this.title = meetingTopicDTO.title();
        this.description = meetingTopicDTO.description();
    }
}
