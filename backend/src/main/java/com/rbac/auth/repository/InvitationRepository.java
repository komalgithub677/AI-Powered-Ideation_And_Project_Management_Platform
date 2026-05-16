package com.rbac.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rbac.auth.entity.Invitation;

import java.util.Optional;
import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    // ✅ Get latest unused invite
    Optional<Invitation> findTopByEmailAndUsedFalseOrderByIdDesc(String email);

    // ✅ (Optional) if you need all invites
    List<Invitation> findByEmail(String email);

    Optional<Invitation> findByToken(String token);
}