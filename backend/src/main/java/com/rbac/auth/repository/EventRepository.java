package com.rbac.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rbac.auth.entity.Event;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUserEmail(String email);
}