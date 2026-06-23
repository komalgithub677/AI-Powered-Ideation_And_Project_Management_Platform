package com.rbac.auth.dto;

public class TeamResponse {

    private Long id;
    private String name;
    private String domain;
    private int memberCount;

    public TeamResponse(
            Long id,
            String name,
            String domain,
            int memberCount
    ) {
        this.id = id;
        this.name = name;
        this.domain = domain;
        this.memberCount = memberCount;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDomain() {
        return domain;
    }

    public int getMemberCount() {
        return memberCount;
    }
}