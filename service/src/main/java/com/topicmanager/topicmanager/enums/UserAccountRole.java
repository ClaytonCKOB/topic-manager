package com.topicmanager.topicmanager.enums;

public enum UserAccountRole {
    ADMIN("admin"),
    PARTICIPANTE("participante"),
    CHEFE("chefe");

    private String role;

    UserAccountRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
