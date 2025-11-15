package com.topicmanager.topicmanager.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "meeting")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MeetingTopic> topics;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MeetingParticipant> participants;

    public Meeting(MeetingCreationDTO meeting) {
        this.title = meeting.title();
        this.startDate = meeting.start_date();
        this.endDate = meeting.end_date();
    }

    public Meeting(Long meeting_id) {
        this.id = meeting_id;
    }
}

