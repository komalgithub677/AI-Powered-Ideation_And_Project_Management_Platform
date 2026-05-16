package com.rbac.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.rbac.auth.entity.Task;
import com.rbac.auth.service.TaskService;
import com.rbac.auth.dto.CreateTaskRequest;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService service;

    // ✅ FIXED (DTO instead of Map)
    @PostMapping("/manager/tasks")
    public Task create(@RequestBody CreateTaskRequest req, Authentication auth) {

        return service.createTask(
                req.getTitle(),
                req.getDescription(),
                req.getAssignedTo(),
                req.getTeamId(),
                auth.getName()
        );
    }

    @GetMapping("/user/tasks")
    public List<Task> get(Authentication auth) {
        return service.getTasks(auth.getName());
    }

    @PutMapping("/user/tasks/{id}/complete")
    public Task complete(@PathVariable Long id) {
        return service.markComplete(id);
    }
}