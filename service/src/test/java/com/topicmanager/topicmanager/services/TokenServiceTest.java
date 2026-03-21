package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("TokenService Tests")
class TokenServiceTest {

    private TokenService tokenService;
    private UserAccount testUser;

    @BeforeEach
    void setUp() {
        tokenService = new TokenService();
        ReflectionTestUtils.setField(tokenService, "secret", "test-secret-key-for-testing");

        testUser = new UserAccount();
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setRole(UserAccountRole.PARTICIPANTE);
    }

    @Test
    @DisplayName("Should generate valid JWT token")
    void shouldGenerateValidToken() {
        String token = tokenService.generateToken(testUser);

        assertNotNull(token, "Token should not be null");
        assertFalse(token.isEmpty(), "Token should not be empty");
        assertTrue(token.split("\\.").length == 3, "Token should have 3 parts separated by dots");
    }

    @Test
    @DisplayName("Should validate correct token and return username")
    void shouldValidateCorrectToken() {
        String token = tokenService.generateToken(testUser);

        String username = tokenService.validateToken(token);

        assertEquals("testuser", username, "Should return correct username");
    }

    @Test
    @DisplayName("Should return empty string for malformed token")
    void shouldReturnEmptyStringForMalformedToken() {
        String malformedToken = "not-a-jwt-token";

        String result = tokenService.validateToken(malformedToken);

        assertEquals("", result, "Should return empty string for malformed token");
    }

    @Test
    @DisplayName("Should return empty string for null token")
    void shouldReturnEmptyStringForNullToken() {
        String result = tokenService.validateToken(null);

        assertEquals("", result, "Should return empty string for null token");
    }

    @Test
    @DisplayName("Should return empty string for empty token")
    void shouldReturnEmptyStringForEmptyToken() {
        String result = tokenService.validateToken("");

        assertEquals("", result, "Should return empty string for empty token");
    }

    @Test
    @DisplayName("Should generate different tokens for same user at different times")
    void shouldGenerateDifferentTokensForSameUser() throws InterruptedException {
        String token1 = tokenService.generateToken(testUser);
        Thread.sleep(1000);

        String token2 = tokenService.generateToken(testUser);

        assertNotEquals(token1, token2, "Tokens generated at different times should be different");
    }

    @Test
    @DisplayName("Should generate different tokens for different users")
    void shouldGenerateDifferentTokensForDifferentUsers() {
        UserAccount anotherUser = new UserAccount();
        anotherUser.setUsername("anotheruser");
        anotherUser.setEmail("another@example.com");
        anotherUser.setRole(UserAccountRole.ADMIN);

        String token1 = tokenService.generateToken(testUser);
        String token2 = tokenService.generateToken(anotherUser);

        assertNotEquals(token1, token2, "Tokens for different users should be different");
    }

    @Test
    @DisplayName("Should throw exception when secret is null")
    void shouldThrowExceptionWhenSecretIsNull() {
        TokenService tokenServiceWithoutSecret = new TokenService();
        ReflectionTestUtils.setField(tokenServiceWithoutSecret, "secret", null);

        assertThrows(RuntimeException.class, () -> {
            tokenServiceWithoutSecret.generateToken(testUser);
        }, "Should throw RuntimeException when secret is null");
    }

    @Test
    @DisplayName("Token should contain correct issuer")
    void tokenShouldContainCorrectIssuer() {
        String token = tokenService.generateToken(testUser);

        String username = tokenService.validateToken(token);

        assertNotNull(username, "Token with correct issuer should be valid");
        assertEquals("testuser", username, "Should extract username correctly");
    }
}
