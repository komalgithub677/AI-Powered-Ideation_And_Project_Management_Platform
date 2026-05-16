package com.rbac.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // ================= INVITE EMAIL =================
    public void sendInviteEmail(String to, String token) {

        String link = "http://localhost:5173/accept-invite?token=" + token;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("🚀 Team Invitation");

            String html = """
                <div style="font-family: Arial; padding:20px;">
                    <h2>You're invited to join a team!</h2>
                    <p>Click below:</p>

                    <a href="%s" style="
                        padding:12px 20px;
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                    ">Accept Invitation</a>

                    <p>%s</p>
                </div>
            """.formatted(link, link);

            helper.setText(html, true);
            mailSender.send(message);

            System.out.println("✅ Invite email sent");

        } catch (MessagingException e) {
            System.out.println("❌ Invite email failed");
            e.printStackTrace();
        }
    }

    // ================= TASK EMAIL =================
    public void sendTaskAssignmentEmail(String to, String title, String description) {

        System.out.println("📧 Sending task email to: " + to);

        String link = "http://localhost:5173/dashboard";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("📌 New Task Assigned");

            String html = """
                <div style="font-family: Arial; padding:20px;">
                    <h2>New Task Assigned 🎯</h2>

                    <p><b>Title:</b> %s</p>
                    <p><b>Description:</b> %s</p>

                    <a href="%s" style="
                        padding:12px 20px;
                        background:#16a34a;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                    ">View Task</a>

                    <p>Login to your dashboard.</p>
                </div>
            """.formatted(title, description, link);

            helper.setText(html, true);
            mailSender.send(message);

            System.out.println("✅ Task email sent successfully");

        } catch (MessagingException e) {
            System.out.println("❌ Task email failed");
            e.printStackTrace();
        }
    }
}