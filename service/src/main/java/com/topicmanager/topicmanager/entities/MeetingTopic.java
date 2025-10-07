package com.topicmanager.topicmanager.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.topicmanager.topicmanager.dto.MeetingTopicDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", referencedColumnName = "meeting_id", nullable = false)
    @JsonBackReference
    private Meeting meeting;

    @Column(nullable = false)
    private String title;

    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_meeting_topic_id")
    @JsonBackReference
    private MeetingTopic parentTopic;

    @OneToMany(mappedBy = "parentTopic", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MeetingTopic> subtopics = new ArrayList<>();

    public MeetingTopic(MeetingTopicDTO meetingTopicDTO) {
        this.meeting = new Meeting(meetingTopicDTO.meeting_id());
        this.title = meetingTopicDTO.title();
        this.description = meetingTopicDTO.description();

        if (meetingTopicDTO.parent_meeting_topic_id() != null) {
            this.parentTopic = new MeetingTopic(meetingTopicDTO.parent_meeting_topic_id());
        }
    }

    public MeetingTopic(Long meeting_topic_id) {
        this.id = meeting_topic_id;
    }
}
