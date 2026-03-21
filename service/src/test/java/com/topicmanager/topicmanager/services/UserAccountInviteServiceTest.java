package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.UserInviteDTO;
import com.topicmanager.topicmanager.entities.UserAccountInvite;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import com.topicmanager.topicmanager.repositories.UserAccountInviteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserAccountInviteService Tests")
class UserAccountInviteServiceTest {

    @Mock
    private UserAccountInviteRepository userAccountInviteRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private UserAccountInviteService userAccountInviteService;

    private UserAccountInvite testInvite;
    private UserInviteDTO testInviteDTO;

    @BeforeEach
    void setUp() {
        testInvite = new UserAccountInvite();
        testInvite.setId("test-invite-id");
        testInvite.setSender_id(1L);
        testInvite.setEmail("invitee@example.com");
        testInvite.setRole(UserAccountRole.PARTICIPANTE);
        testInvite.setActive(true);

        testInviteDTO = new UserInviteDTO(1L, "invitee@example.com", UserAccountRole.PARTICIPANTE);
    }

    @Test
    @DisplayName("Should return all invitations")
    void shouldReturnAllInvitations() {
        List<UserAccountInvite> invites = List.of(testInvite);
        when(userAccountInviteRepository.findAll()).thenReturn(invites);

        List<UserAccountInvite> result = userAccountInviteService.list();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testInvite, result.get(0));
        verify(userAccountInviteRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should create invitation successfully")
    void shouldCreateInvitationSuccessfully() {
        List<UserInviteDTO> inviteDTOs = List.of(testInviteDTO);
        when(userAccountInviteRepository.save(any(UserAccountInvite.class))).thenReturn(testInvite);
        doNothing().when(notificationService).sendInvitation(any(UserAccountInvite.class));

        assertDoesNotThrow(() -> userAccountInviteService.create(inviteDTOs));

        verify(notificationService, times(1)).sendInvitation(any(UserAccountInvite.class));
        verify(userAccountInviteRepository, times(1)).save(any(UserAccountInvite.class));
    }

    @Test
    @DisplayName("Should throw exception when email sending fails")
    void shouldThrowExceptionWhenEmailSendingFails() {
        List<UserInviteDTO> inviteDTOs = List.of(testInviteDTO);
        when(userAccountInviteRepository.save(any(UserAccountInvite.class))).thenReturn(testInvite);
        doThrow(new RuntimeException("Email service unavailable"))
                .when(notificationService).sendInvitation(any(UserAccountInvite.class));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userAccountInviteService.create(inviteDTOs);
        });

        assertEquals("Failed to send invitation email", exception.getMessage());
        verify(userAccountInviteRepository, times(1)).save(any(UserAccountInvite.class));
    }

    @Test
    @DisplayName("Should create multiple invitations")
    void shouldCreateMultipleInvitations() {
        UserInviteDTO invite1 = new UserInviteDTO(1L, "user1@example.com", UserAccountRole.PARTICIPANTE);
        UserInviteDTO invite2 = new UserInviteDTO(1L, "user2@example.com", UserAccountRole.PARTICIPANTE);
        List<UserInviteDTO> inviteDTOs = List.of(invite1, invite2);

        when(userAccountInviteRepository.save(any(UserAccountInvite.class))).thenReturn(testInvite);
        doNothing().when(notificationService).sendInvitation(any(UserAccountInvite.class));

        assertDoesNotThrow(() -> userAccountInviteService.create(inviteDTOs));

        verify(notificationService, times(2)).sendInvitation(any(UserAccountInvite.class));
        verify(userAccountInviteRepository, times(2)).save(any(UserAccountInvite.class));
    }

    @Test
    @DisplayName("Should get invitation by ID successfully")
    void shouldGetInvitationByIdSuccessfully() {
        when(userAccountInviteRepository.findById("test-invite-id")).thenReturn(Optional.of(testInvite));

        UserInviteDTO result = userAccountInviteService.getInvitation("test-invite-id");

        assertNotNull(result);
        assertEquals(testInvite.getSender_id(), result.sender_id());
        assertEquals(testInvite.getEmail(), result.email());
        assertEquals(testInvite.getRole(), result.role());
        verify(userAccountInviteRepository, times(1)).findById("test-invite-id");
    }

    @Test
    @DisplayName("Should throw EntityNotFoundException when invitation not found")
    void shouldThrowEntityNotFoundExceptionWhenInvitationNotFound() {
        when(userAccountInviteRepository.findById("non-existent-id")).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            userAccountInviteService.getInvitation("non-existent-id");
        });

        assertEquals("Invite not found", exception.getMessage());
        verify(userAccountInviteRepository, times(1)).findById("non-existent-id");
    }

    @Test
    @DisplayName("Should expire invitation successfully")
    void shouldExpireInvitationSuccessfully() {
        when(userAccountInviteRepository.findById("test-invite-id")).thenReturn(Optional.of(testInvite));
        when(userAccountInviteRepository.save(any(UserAccountInvite.class))).thenReturn(testInvite);

        assertDoesNotThrow(() -> userAccountInviteService.expireInvitation("test-invite-id"));

        assertFalse(testInvite.getActive());
        verify(userAccountInviteRepository, times(1)).findById("test-invite-id");
        verify(userAccountInviteRepository, times(1)).save(testInvite);
    }

    @Test
    @DisplayName("Should throw EntityNotFoundException when expiring non-existent invitation")
    void shouldThrowEntityNotFoundExceptionWhenExpiringNonExistentInvitation() {
        when(userAccountInviteRepository.findById("non-existent-id")).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            userAccountInviteService.expireInvitation("non-existent-id");
        });

        assertEquals("Invite not found", exception.getMessage());
        verify(userAccountInviteRepository, times(1)).findById("non-existent-id");
        verify(userAccountInviteRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should handle empty invitation list")
    void shouldHandleEmptyInvitationList() {
        List<UserInviteDTO> emptyList = List.of();

        assertDoesNotThrow(() -> userAccountInviteService.create(emptyList));

        verify(notificationService, never()).sendInvitation(any());
        verify(userAccountInviteRepository, never()).save(any());
    }
}
