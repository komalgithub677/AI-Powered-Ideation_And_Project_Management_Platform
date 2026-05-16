package com.rbac.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbac.auth.entity.Team;
import com.rbac.auth.entity.User;
import com.rbac.auth.repository.TeamRepository;
import com.rbac.auth.repository.UserRepository;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepo;

    @Autowired
    private UserRepository userRepo;

    public Team createTeam(String name, String domain, String managerEmail) {

        User manager = userRepo.findByEmail(managerEmail);

        Team team = new Team();
        team.setName(name);
        team.setDomain(domain);
        team.setManager(manager);

        return teamRepo.save(team);
    }

    public List<Team> getTeams(String managerEmail) {
        return teamRepo.findByManagerEmail(managerEmail);
    }

    // ✅ NEW
    public Team getTeamById(Long id) {
        return teamRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }
}