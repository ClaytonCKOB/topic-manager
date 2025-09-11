package com.topicmanager.topicmanager.entities;

import com.topicmanager.topicmanager.dto.MeetingDTO;
import com.topicmanager.topicmanager.enums.MeetingStatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
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

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MeetingTopic> topics = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "meeting_participant",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "user_account_id")
    )
    private Set<UserAccount> participants = new HashSet<>();

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MeetingVote> votes = new HashSet<>();

    public Meeting(MeetingDTO meeting) {
        this.title = meeting.title();
        this.description = meeting.description();
        this.startDate = meeting.start_date();
        this.endDate = meeting.end_date();
        this.status = new MeetingStatus(Long.valueOf(MeetingStatusEnum.CRIADO.getCode()));
    }
}

