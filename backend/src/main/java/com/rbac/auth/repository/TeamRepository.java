package com.rbac.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rbac.auth.entity.Team;
import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByManagerEmail(String email);
}