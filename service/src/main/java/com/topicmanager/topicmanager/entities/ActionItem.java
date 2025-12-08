package com.topicmanager.topicmanager.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "action_item")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ActionItem {
    @Id
    @Column(name = "action_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_topic_id")
    @JsonBackReference
    private MeetingTopic topic;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private UserAccount sender;

    @ManyToOne
    @JoinColumn(name = "actor_id", nullable = false)
    private UserAccount actor;

    private String comment;

    @Column(nullable = false)
    private Boolean completed;

    @Column(name = "completed_date")
    private LocalDateTime completedDate;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();
}
