package com.rbac.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbac.auth.entity.Task;
import com.rbac.auth.entity.User;
import com.rbac.auth.entity.Team;
import com.rbac.auth.repository.TaskRepository;
import com.rbac.auth.repository.UserRepository;
import com.rbac.auth.repository.TeamRepository;

import java.util.List;

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

    // 🔥 ADD THIS
    @Autowired
    private EmailService emailService;

    // ================= CREATE TASK =================
    public Task createTask(String title, String desc, String assignedEmail, Long teamId, String creatorEmail) {

        if (title == null || title.isEmpty())
            throw new RuntimeException("Title is required");

        if (assignedEmail == null || assignedEmail.isEmpty())
            throw new RuntimeException("Assigned email is required");

        if (teamId == null)
            throw new RuntimeException("Team must be selected");

        User assignedUser = userRepo.findByEmail(assignedEmail);
        if (assignedUser == null)
            throw new RuntimeException("Assigned user not found");

        User creator = userRepo.findByEmail(creatorEmail);
        if (creator == null)
            throw new RuntimeException("Creator not found");

        Team team = teamRepo.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        Task task = new Task();
        task.setTitle(title);
        task.setDescription(desc);
        task.setAssignedTo(assignedUser);
        task.setCreatedBy(creator);
        task.setTeam(team);

        Task saved = repo.save(task);

        // 🔔 DATABASE NOTIFICATION
        notificationService.create(
                "New Task Assigned: " + title,
                assignedUser
        );

        // 🔥 EMAIL (THIS WAS MISSING)
        try {
            emailService.sendTaskAssignmentEmail(
                    assignedUser.getEmail(),
                    title,
                    desc
            );
        } catch (Exception e) {
            System.out.println("❌ Email failed but task created");
        }

        return saved;
    }

    // ================= GET TASKS =================
    public List<Task> getTasks(String email) {
        return repo.findByAssignedToEmail(email);
    }

    // ================= COMPLETE =================
    public Task markComplete(Long id) {
        Task task = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("COMPLETED");
        return repo.save(task);
    }
}