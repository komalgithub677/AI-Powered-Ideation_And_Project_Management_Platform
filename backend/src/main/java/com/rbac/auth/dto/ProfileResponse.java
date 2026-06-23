package com.rbac.auth.dto;

public class ProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String role;

    private String teamName;
    private String teamDomain;

    private int teamMembersCount;
    private int assignedTasksCount;
    private int createdTasksCount;
    private int notificationsCount;

    public ProfileResponse() {
    }

    public ProfileResponse(
            Long id,
            String name,
            String email,
            String role,
            String teamName,
            String teamDomain,
            int teamMembersCount,
            int assignedTasksCount,
            int createdTasksCount,
            int notificationsCount) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.teamName = teamName;
        this.teamDomain = teamDomain;
        this.teamMembersCount = teamMembersCount;
        this.assignedTasksCount = assignedTasksCount;
        this.createdTasksCount = createdTasksCount;
        this.notificationsCount = notificationsCount;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getTeamName() { return teamName; }
    public String getTeamDomain() { return teamDomain; }
    public int getTeamMembersCount() { return teamMembersCount; }
    public int getAssignedTasksCount() { return assignedTasksCount; }
    public int getCreatedTasksCount() { return createdTasksCount; }
    public int getNotificationsCount() { return notificationsCount; }
}