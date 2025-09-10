package com.topicmanager.topicmanager.enums;

public enum UserAccountRole {
    ADMIN("admin"),
    USER("user");

    private String description;

    UserAccountRole(String role) {
        this.description = role;
    }

    public String getDescription() {
        return description;
    }
}
