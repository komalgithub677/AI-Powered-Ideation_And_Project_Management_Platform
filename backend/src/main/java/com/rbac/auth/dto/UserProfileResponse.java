package com.rbac.auth.dto;

import java.util.List;

public class UserProfileResponse {

    private String name;
    private String email;
    private String role;
    private String teamName;
    private int teamMembersCount;
    private int projectsCount;
    private int notificationsCount;
    private String joinedDate;
    private List<String> recentActivities;

    public UserProfileResponse() {
    }

    public UserProfileResponse(
            String name,
            String email,
            String role,
            String teamName,
            int teamMembersCount,
            int projectsCount,
            int notificationsCount,
            String joinedDate,
            List<String> recentActivities) {

        this.name = name;
        this.email = email;
        this.role = role;
        this.teamName = teamName;
        this.teamMembersCount = teamMembersCount;
        this.projectsCount = projectsCount;
        this.notificationsCount = notificationsCount;
        this.joinedDate = joinedDate;
        this.recentActivities = recentActivities;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public int getTeamMembersCount() {
        return teamMembersCount;
    }

    public void setTeamMembersCount(int teamMembersCount) {
        this.teamMembersCount = teamMembersCount;
    }

    public int getProjectsCount() {
        return projectsCount;
    }

    public void setProjectsCount(int projectsCount) {
        this.projectsCount = projectsCount;
    }

    public int getNotificationsCount() {
        return notificationsCount;
    }

    public void setNotificationsCount(int notificationsCount) {
        this.notificationsCount = notificationsCount;
    }

    public String getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(String joinedDate) {
        this.joinedDate = joinedDate;
    }

    public List<String> getRecentActivities() {
        return recentActivities;
    }

    public void setRecentActivities(List<String> recentActivities) {
        this.recentActivities = recentActivities;
    }
}