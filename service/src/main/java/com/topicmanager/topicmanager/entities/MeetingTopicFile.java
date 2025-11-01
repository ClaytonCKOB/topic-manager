package com.topicmanager.topicmanager.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.time.LocalDateTime;

@Entity
@Table(name = "meeting_topic_file")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingTopicFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_topic_file_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_topic_id", nullable = false)
    @JsonBackReference
    private MeetingTopic meetingTopic;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Lob
    @JdbcTypeCode(Types.BINARY)
    @Column(name = "file_data", nullable = false, columnDefinition = "BYTEA")
    private byte[] fileData;

    @Column(name = "uploaded_date")
    private LocalDateTime uploadedDate = LocalDateTime.now();
}
