package com.rbac.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbac.auth.entity.Event;
import com.rbac.auth.entity.User;
import com.rbac.auth.repository.EventRepository;
import com.rbac.auth.repository.UserRepository;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Create Event
    public Event create(Event event, String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        event.setUser(user);

        return eventRepository.save(event);
    }

    // ✅ Get Events for logged-in user
    public List<Event> get(String email) {

        return eventRepository.findByUserEmail(email);
    }
}