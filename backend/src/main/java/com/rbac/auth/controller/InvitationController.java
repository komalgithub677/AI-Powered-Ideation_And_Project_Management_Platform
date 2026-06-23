
package com.rbac.auth.controller;

import java.util.HashMap;
import java.util.Map;

import com.rbac.auth.service.InvitationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invite")
@CrossOrigin(origins = "http://localhost:5173")
public class InvitationController {

    @Autowired
    private InvitationService service;

    // ================= SEND INVITE =================

    @PostMapping("/send")
    public String send(
            @RequestParam String email,
            @RequestParam Long teamId,
            Authentication auth
    ) {

        return service.sendInvite(
                email,
                auth.getName(),
                teamId
        );
    }

    // ================= ACCEPT INVITE =================

    @PostMapping("/accept")
    public Map<String, String> accept(
            @RequestParam String token
    ) {

        String email =
                service.acceptInvite(token);

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Invitation Accepted Successfully"
        );

        response.put(
                "email",
                email
        );

        return response;
    }
}

