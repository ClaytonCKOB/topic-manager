package com.topicmanager.topicmanager.entities;

import com.topicmanager.topicmanager.dto.UserInviteDTO;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_account_invite")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAccountInvite {
    @Id
    @Column(name = "user_account_invite_id")
    private String id;

    @Column(nullable = false)
    private Long sender_id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private UserAccountRole role;

    @Column(nullable = false)
    private Boolean active;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    public UserAccountInvite(UserInviteDTO userAccountInviteDTO) {
        this.id = UUID.randomUUID().toString();
        this.sender_id = userAccountInviteDTO.sender_id();
        this.email = userAccountInviteDTO.email();
        this.role = userAccountInviteDTO.role();
        this.active = true;
        this.createdDate = LocalDateTime.now();
    }
}
