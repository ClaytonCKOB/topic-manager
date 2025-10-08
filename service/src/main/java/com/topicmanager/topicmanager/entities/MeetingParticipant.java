package com.topicmanager.topicmanager.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.topicmanager.topicmanager.entities.ids.MeetingParticipantId;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "meeting_participant")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingParticipant {

    @EmbeddedId
    private MeetingParticipantId id = new MeetingParticipantId();

    @ManyToOne
    @MapsId("meetingId")
    @JoinColumn(name = "meeting_id")
    @JsonBackReference
    private Meeting meeting;

    @ManyToOne
    @MapsId("userAccountId")
    @JoinColumn(name = "user_account_id")
    @JsonBackReference
    private UserAccount user;

    @Column(nullable = false)
    private UserAccountRole role;

    public MeetingParticipant(UserAccount user, Meeting meeting) {
        this.meeting = meeting;
        this.user = user;
        this.role = user.getRole();
    }
}

