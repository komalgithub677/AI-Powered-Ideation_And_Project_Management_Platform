package com.rbac.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rbac.auth.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedToEmail(String email);

    long countByAssignedToEmail(String email);

    long countByCreatedByEmail(String email);
}