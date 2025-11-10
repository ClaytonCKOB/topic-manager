package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.entities.UserAccountInvite;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final JavaMailSender mailSender;

    @Value("${application.domain}")
    private String domain;

    public NotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendHtml(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom("no-reply@topicmanager.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);

        mailSender.send(message);
    }

    public void sendInvitation(UserAccountInvite userAccountInvite) {
        String inviteLink = domain + "/register/" + userAccountInvite.getId();

        String htmlBody = """
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
            <div style="max-width: 600px; background-color: #ffffff; border-radius: 8px; padding: 25px;">
                
                <h2 style="color: #333;">You have been invited to join Topic Manager</h2>

                <p style="font-size: 15px; color: #555;">
                    Hello,<br><br>
                    You have been invited to create an account in the Topic Manager application.
                    Click the button below to complete your registration:
                </p>

                <p style="text-align: center; margin: 35px 0;">
                    <a href="%s" style="
                        background-color: #4A6CF7;
                        padding: 12px 22px;
                        border-radius: 6px;
                        color: white;
                        text-decoration: none;
                        font-size: 16px;
                        display: inline-block;
                    ">Register Now</a>
                </p>

                <p style="font-size: 13px; color: #999;">
                    If the button above does not work, copy and paste this link in your browser:<br>
                    <span style="color: #4A6CF7;">%s</span>
                </p>

            </div>
        </div>
        """.formatted(inviteLink, inviteLink);

        try {
            sendHtml(userAccountInvite.getEmail(), "You're invited to Topic Manager", htmlBody);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send invitation email", e);
        }
    }
}
