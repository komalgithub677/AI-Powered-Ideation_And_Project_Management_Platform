package com.rbac.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rbac.auth.entity.Team;
import com.rbac.auth.entity.User;

public interface TeamRepository
        extends JpaRepository<Team, Long> {

    // Existing method
    List<Team> findByManagerEmail(String email);

    // Optional (recommended)
    List<Team> findByManager(User manager);
}