package com.topicmanager.topicmanager.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.topicmanager.topicmanager.dto.MeetingCreationDTO;
import com.topicmanager.topicmanager.enums.MeetingStatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name = "meeting_status_id", nullable = false)
    private MeetingStatus status;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MeetingTopic> topics;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MeetingParticipant> participants;

    public Meeting(MeetingCreationDTO meeting) {
        this.title = meeting.title();
        this.description = meeting.description();
        this.startDate = meeting.start_date();
        this.endDate = meeting.end_date();
        this.status = new MeetingStatus(Long.valueOf(MeetingStatusEnum.CRIADO.getCode()));
    }

    public Meeting(Long meeting_id) {
        this.id = meeting_id;
    }
}

