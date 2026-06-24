package com.rbac.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.rbac.auth.dto.ChatMessageDTO;
import com.rbac.auth.entity.ChatMessage;
import com.rbac.auth.service.ChatService;

@Controller
public class ChatWebSocketController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(
            ChatMessageDTO dto
    ) {

        ChatMessage saved =
                chatService.sendMessage(
                        dto.getSenderEmail(),
                        dto.getReceiverEmail(),
                        dto.getMessage()
                );

        messagingTemplate.convertAndSend(
                "/topic/messages",
                saved
        );
    }
}