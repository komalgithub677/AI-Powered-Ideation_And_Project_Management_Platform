package com.rbac.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.rbac.auth.dto.ChatUserDTO;
import com.rbac.auth.dto.SendMessageRequest;
import com.rbac.auth.entity.ChatMessage;
import com.rbac.auth.repository.UserRepository;
import com.rbac.auth.service.ChatService;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private ChatService service;

    @Autowired
    private UserRepository userRepository;

    // =========================
    // SEND MESSAGE
    // =========================

    @PostMapping("/send")
    public ChatMessage send(
            @RequestBody SendMessageRequest request,
            Authentication auth
    ) {

        return service.sendMessage(
                auth.getName(),
                request.getReceiverEmail(),
                request.getMessage()
        );
    }

    // =========================
    // CHAT HISTORY
    // =========================

    @GetMapping("/history")
    public List<ChatMessage> history(
            @RequestParam String receiverEmail,
            Authentication auth
    ) {

        return service.getConversation(
                auth.getName(),
                receiverEmail
        );
    }

    // =========================
    // GET ALL USERS
    // =========================

    @GetMapping("/users")
    public List<ChatUserDTO> users() {

        return userRepository.findAll()
                .stream()
                .map(user ->
                        new ChatUserDTO(
                                user.getId(),
                                user.getName(),
                                user.getEmail()
                        )
                )
                .toList();
    }
}