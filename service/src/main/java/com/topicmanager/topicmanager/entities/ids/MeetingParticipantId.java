package com.topicmanager.topicmanager.entities.ids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingParticipantId implements Serializable {
    @Column(name = "meeting_id")
    private Long meetingId;

    @Column(name = "user_account_id")
    private Long userAccountId;
}