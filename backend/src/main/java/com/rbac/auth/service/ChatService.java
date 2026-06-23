package com.rbac.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rbac.auth.entity.ChatMessage;
import com.rbac.auth.repository.ChatMessageRepository;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository repository;

    public ChatMessage sendMessage(
            String sender,
            String receiver,
            String message
    ) {

        ChatMessage chat = new ChatMessage();

        chat.setSenderEmail(sender);
        chat.setReceiverEmail(receiver);
        chat.setMessage(message);

        return repository.save(chat);
    }

    public List<ChatMessage> getConversation(
            String sender,
            String receiver
    ) {

        return repository
                .findBySenderEmailAndReceiverEmailOrReceiverEmailAndSenderEmailOrderBySentAtAsc(
                        sender,
                        receiver,
                        receiver,
                        sender
                );
    }
}