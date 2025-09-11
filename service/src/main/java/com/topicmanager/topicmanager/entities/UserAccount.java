package com.topicmanager.topicmanager.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user_account")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAccount implements UserDetails {

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

    public UserAccount(String username, String encryptedPassword, UserAccountRole role, String email) {
        this.username = username;
        this.password = encryptedPassword;
        this.email = email;
        this.role = role;
        this.active = true;
    }

    @Override
    public String getPassword(){
        return this.password;
    };

    @Override
    public String getUsername(){
        return this.username;
    };

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserAccountRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }
}

