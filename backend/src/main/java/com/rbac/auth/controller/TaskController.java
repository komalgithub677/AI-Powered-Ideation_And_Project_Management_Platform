package com.rbac.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.rbac.auth.dto.CreateTaskRequest;
import com.rbac.auth.entity.Task;
import com.rbac.auth.service.TaskService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/manager/tasks")
    public Task createTask(
            @RequestBody CreateTaskRequest request,
            Authentication authentication) {

        return taskService.createTask(
                request.getTitle(),
                request.getDescription(),
                request.getAssignedTo(),
                request.getTeamId(),
                authentication.getName()
        );
    }

    @GetMapping("/user/tasks")
    public List<Task> getTasks(Authentication authentication) {

        return taskService.getTasks(
                authentication.getName()
        );
    }

    @PutMapping("/user/tasks/{id}/complete")
    public Task completeTask(@PathVariable Long id) {

        return taskService.markComplete(id);
    }

    @PostMapping("/manager/test")
    public String testEndpoint() {

        return "Task Controller Working";
    }
}