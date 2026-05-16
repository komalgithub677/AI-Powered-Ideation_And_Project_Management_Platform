package com.rbac.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.rbac.auth.entity.Team;
import com.rbac.auth.entity.User;
import com.rbac.auth.service.TeamService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager/teams")
@CrossOrigin(origins = "http://localhost:5173")
public class TeamController {

    @Autowired
    private TeamService service;

    @PostMapping
    public Team create(@RequestBody Map<String, String> body, Authentication auth) {
        return service.createTeam(
                body.get("name"),
                body.get("domain"),
                auth.getName()
        );
    }

    @GetMapping
    public List<Team> get(Authentication auth) {
        return service.getTeams(auth.getName());
    }

    // ✅ GET MEMBERS
    @GetMapping("/{teamId}/members")
    public List<User> getMembers(@PathVariable Long teamId) {
        return service.getTeamById(teamId).getMembers();
    }
}