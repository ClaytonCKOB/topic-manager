package com.topicmanager.topicmanager.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.topicmanager.topicmanager.dto.TopicVoteDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "topic_vote")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_vote_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meeting_topic_id", nullable = false)
    @JsonBackReference
    private MeetingTopic meetingTopic;

    @ManyToOne
    @JoinColumn(name = "user_account_id", nullable = false)
    private UserAccount user;

    @Column(name = "status")
    private Integer status;

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate = LocalDateTime.now();

    public TopicVote(TopicVoteDTO topicVote) {
        this.meetingTopic = new MeetingTopic(topicVote.meeting_topic_id());
        this.user = new UserAccount(topicVote.user_account_id());
        this.status = topicVote.status();
    }
}

