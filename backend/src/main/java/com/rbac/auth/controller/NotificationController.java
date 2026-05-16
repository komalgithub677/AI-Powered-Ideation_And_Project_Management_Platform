package com.rbac.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.rbac.auth.entity.Notification;
import com.rbac.auth.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService service;

    @GetMapping
    public List<Notification> get(Authentication auth) {
        return service.get(auth.getName());
    }
}