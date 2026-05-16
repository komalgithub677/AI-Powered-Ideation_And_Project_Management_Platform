package com.rbac.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.rbac.auth.dto.LoginRequest;
import com.rbac.auth.dto.LoginResponse;
import com.rbac.auth.dto.RegisterRequest;
import com.rbac.auth.entity.User;
import com.rbac.auth.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // ================= REGISTER =================
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}