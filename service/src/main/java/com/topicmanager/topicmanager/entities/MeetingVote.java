package com.topicmanager.topicmanager.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "meeting_vote")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_vote_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @ManyToOne
    @JoinColumn(name = "meeting_topic_id", nullable = false)
    private MeetingTopic meetingTopic;

    @ManyToOne
    @JoinColumn(name = "user_account_id", nullable = false)
    private UserAccount user;

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate = LocalDateTime.now();
}

