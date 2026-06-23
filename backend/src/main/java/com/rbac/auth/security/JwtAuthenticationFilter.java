package com.rbac.auth.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.rbac.auth.entity.User;
import com.rbac.auth.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain)
            throws ServletException, IOException {

        String uri = req.getRequestURI();

        // ============================
        // SKIP WEBSOCKET REQUESTS
        // ============================

        if (uri.startsWith("/ws")) {
            chain.doFilter(req, res);
            return;
        }

        String header = req.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        try {

            String token = header.substring(7);

            if (!jwtService.validateToken(token)) {
                chain.doFilter(req, res);
                return;
            }

            String email =
                    jwtService.extractEmail(token);

            User user =
                    userRepository.findByEmail(email);

            if (user != null
                    && SecurityContextHolder
                    .getContext()
                    .getAuthentication() == null) {

                String role =
                        "ROLE_" + user.getRole().name();

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                List.of(
                                        new SimpleGrantedAuthority(role)
                                )
                        );

                auth.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(req)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(auth);
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT ERROR: " + e.getMessage()
            );
        }

        chain.doFilter(req, res);
    }
}