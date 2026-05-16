package com.rbac.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rbac.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}