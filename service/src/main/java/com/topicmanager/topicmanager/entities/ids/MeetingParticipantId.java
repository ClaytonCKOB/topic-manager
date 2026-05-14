package com.topicmanager.topicmanager.entities.ids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MeetingParticipantId that = (MeetingParticipantId) o;
        return Objects.equals(meetingId, that.meetingId) &&
               Objects.equals(userAccountId, that.userAccountId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(meetingId, userAccountId);
    }
}