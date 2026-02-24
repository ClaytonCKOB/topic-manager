package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByStartDateBeforeAndEndDateAfter(LocalDateTime now, LocalDateTime now2);
}
