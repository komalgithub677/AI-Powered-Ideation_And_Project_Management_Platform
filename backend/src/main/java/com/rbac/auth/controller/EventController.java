package com.rbac.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.rbac.auth.entity.Event;
import com.rbac.auth.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    private EventService service;

    @PostMapping
    public Event create(@RequestBody Event event, Authentication auth) {
        return service.create(event, auth.getName());
    }

    @GetMapping
    public List<Event> get(Authentication auth) {
        return service.get(auth.getName());
    }
}