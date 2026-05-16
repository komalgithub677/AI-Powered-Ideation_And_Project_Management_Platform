package com.rbac.auth.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbac.auth.entity.Invitation;
import com.rbac.auth.entity.Team;
import com.rbac.auth.entity.User;
import com.rbac.auth.repository.InvitationRepository;
import com.rbac.auth.repository.TeamRepository;
import com.rbac.auth.repository.UserRepository;

@Service
public class InvitationService {

    @Autowired
    private InvitationRepository repo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private EmailService emailService;

    // ✅ SEND INVITE (NO DUPLICATES)
    public String sendInvite(String email, String managerEmail, Long teamId) {

        User manager = userRepository.findByEmail(managerEmail);
        if (manager == null) throw new RuntimeException("Manager not found");

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        // ✅ Check existing unused invite (LATEST)
        if (repo.findTopByEmailAndUsedFalseOrderByIdDesc(email).isPresent()) {
            throw new RuntimeException("User already invited");
        }

        Invitation inv = new Invitation();
        inv.setEmail(email);
        inv.setToken(UUID.randomUUID().toString());
        inv.setAccepted(false);
        inv.setUsed(false);
        inv.setManager(manager);
        inv.setTeam(team);

        repo.save(inv);

        emailService.sendInviteEmail(email, inv.getToken());

        return inv.getToken();
    }

    // ✅ ACCEPT INVITE
    public void acceptInvite(String token) {

        Invitation inv = repo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (inv.isUsed()) {
            throw new RuntimeException("Invite already used");
        }

        inv.setAccepted(true);
        repo.save(inv);
    }
}