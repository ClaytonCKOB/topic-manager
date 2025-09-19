package com.topicmanager.topicmanager.repositories;

import com.topicmanager.topicmanager.entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    @Query("SELECT DISTINCT m FROM Meeting m LEFT JOIN FETCH m.topics t WHERE m.id = :id")
    Optional<Meeting> findByIdWithTopics(@Param("id") Long id);

}
