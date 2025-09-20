package com.topicmanager.topicmanager.entities;

import com.topicmanager.topicmanager.dto.MeetingVoteDTO;
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

    @Column(name = "status")
    private Integer status;

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate = LocalDateTime.now();

    public MeetingVote(MeetingVoteDTO meetingVote) {
        this.meeting = new Meeting(meetingVote.meeting_id());
        this.meetingTopic = new MeetingTopic(meetingVote.meeting_topic_id());
        this.user = new UserAccount(meetingVote.user_account_id());
        this.status = meetingVote.status();
    }
}

