package com.rbac.auth.entity;

import jakarta.persistence.*;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    // ✅ FIXED (renamed column)
    @Column(name = "is_read")
    private boolean isRead = false;

    @ManyToOne
    private User user;

    public Long getId() { return id; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean isRead) { this.isRead = isRead; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}