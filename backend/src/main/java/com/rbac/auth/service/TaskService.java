package com.rbac.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbac.auth.entity.Task;
import com.rbac.auth.entity.Team;
import com.rbac.auth.entity.User;
import com.rbac.auth.repository.TaskRepository;
import com.rbac.auth.repository.TeamRepository;
import com.rbac.auth.repository.UserRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TeamRepository teamRepo;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private EmailService emailService;

    public Task createTask(
            String title,
            String desc,
            String assignedEmail,
            Long teamId,
            String creatorEmail) {

        User assignedUser = userRepo.findByEmail(assignedEmail);

        if (assignedUser == null) {
            throw new RuntimeException("Assigned user not found");
        }

        User creator = userRepo.findByEmail(creatorEmail);

        if (creator == null) {
            throw new RuntimeException("Creator not found");
        }

        Team team = teamRepo.findById(teamId)
                .orElseThrow(() ->
                        new RuntimeException("Team not found"));

        Task task = new Task();

        task.setTitle(title);
        task.setDescription(desc);
        task.setAssignedTo(assignedUser);
        task.setCreatedBy(creator);
        task.setTeam(team);
        task.setStatus("PENDING");

        Task savedTask = repo.save(task);

        notificationService.create(
                "📌 New Task Assigned: " + title,
                assignedUser
        );

        try {

            emailService.sendTaskAssignmentEmail(
                    assignedUser.getEmail(),
                    title,
                    desc
            );

        } catch (Exception e) {

            e.printStackTrace();
        }

        return savedTask;
    }

    public List<Task> getTasks(String email) {

        return repo.findByAssignedToEmail(email);
    }

    public Task markComplete(Long id) {

        Task task = repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        task.setStatus("COMPLETED");

        return repo.save(task);
    }
}