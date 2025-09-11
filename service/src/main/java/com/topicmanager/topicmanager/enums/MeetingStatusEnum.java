package com.topicmanager.topicmanager.enums;

public enum MeetingStatusEnum {

    CRIADO(1, "Criado"),
    EM_ANDAMENTO(2, "Em andamento"),
    FINALIZADO(3, "Finalizado");

    private final int code;
    private final String description;

    MeetingStatusEnum(int code, String description) {
        this.code = code;
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public static MeetingStatusEnum fromCode(int code) {
        for (MeetingStatusEnum s : values()) {
            if (s.code == code) {
                return s;
            }
        }
        throw new IllegalArgumentException("Invalid MeetingStatusEnum code: " + code);
    }

    public static MeetingStatusEnum fromDescription(String description) {
        for (MeetingStatusEnum s : values()) {
            if (s.description.equalsIgnoreCase(description)) {
                return s;
            }
        }
        throw new IllegalArgumentException("Invalid Status description: " + description);
    }
}
