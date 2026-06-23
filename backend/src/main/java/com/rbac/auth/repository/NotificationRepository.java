package com.rbac.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rbac.auth.entity.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByUserEmail(String email);

    long countByUserEmail(String email);
}