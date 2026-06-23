package com.rbac.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rbac.auth.dto.LoginRequest;
import com.rbac.auth.dto.LoginResponse;
import com.rbac.auth.dto.RegisterRequest;
import com.rbac.auth.entity.Invitation;
import com.rbac.auth.entity.Role;
import com.rbac.auth.entity.Team;
import com.rbac.auth.entity.User;
import com.rbac.auth.repository.InvitationRepository;
import com.rbac.auth.repository.TeamRepository;
import com.rbac.auth.repository.UserRepository;
import com.rbac.auth.security.JwtService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ================= REGISTER =================
    public User registerUser(RegisterRequest request) {

        // Validate role
        if (request.getRole() == null) {
            throw new RuntimeException("Please select a role");
        }

        // Prevent duplicate email
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("User already exists with this email");
        }

        // ============================
        // PROJECT MANAGER SIGNUP
        // ============================
        if (request.getRole() == Role.PROJECT_MANAGER) {

            User manager = new User();

            manager.setName(request.getName());
            manager.setEmail(request.getEmail());
            manager.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );
            manager.setRole(Role.PROJECT_MANAGER);

            return userRepository.save(manager);
        }

        // ============================
        // USER SIGNUP (INVITE BASED)
        // ============================

        Invitation inv = invitationRepository
                .findTopByEmailAndUsedFalseOrderByIdDesc(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "You are not invited. Please contact your manager."
                        )
                );

        // Invite not accepted
        if (!inv.isAccepted()) {
            throw new RuntimeException(
                    "Please accept the invitation first."
            );
        }

        // Already used
        if (inv.isUsed()) {
            throw new RuntimeException(
                    "Invitation already used."
            );
        }

        // Mark invite used
        inv.setUsed(true);
        invitationRepository.save(inv);

        // Create user
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        // ============================
        // ADD USER TO TEAM
        // ============================

        Team team = inv.getTeam();

        if (team != null) {

            if (!team.getMembers().contains(savedUser)) {

                team.getMembers().add(savedUser);

                teamRepository.save(team);
            }
        }

        return savedUser;
    }

    // ================= LOGIN =================
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(
                request.getEmail()
        );

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid password");
        }

        String token =
                jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole().name()
        );
    }
}