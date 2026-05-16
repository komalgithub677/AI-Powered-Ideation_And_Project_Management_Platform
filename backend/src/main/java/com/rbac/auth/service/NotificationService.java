package com.rbac.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rbac.auth.entity.Notification;
import com.rbac.auth.entity.User;
import com.rbac.auth.repository.NotificationRepository;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repo;

    public void create(String message, User user) {
        Notification n = new Notification();
        n.setMessage(message);
        n.setUser(user);
        repo.save(n);
    }

    public List<Notification> get(String email) {
        return repo.findByUserEmail(email);
    }
}