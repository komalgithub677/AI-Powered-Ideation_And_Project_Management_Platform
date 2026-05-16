package com.rbac.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rbac.auth.entity.Task;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedToEmail(String email);
}