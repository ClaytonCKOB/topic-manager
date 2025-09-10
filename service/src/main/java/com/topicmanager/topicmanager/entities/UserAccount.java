package com.topicmanager.topicmanager.entities;


import com.topicmanager.topicmanager.enums.UserAccountRole;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_account")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_account_id")
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private UserAccountRole role;

    @Column(nullable = false)
    private Boolean active;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    @ManyToMany(mappedBy = "participants")
    private Set<Meeting> meetings = new HashSet<>();

    public UserAccount(String username, String encryptedPassword, UserAccountRole role) {
        this.username = username;
        this.password = encryptedPassword;
        this.role = role;
    }


}

