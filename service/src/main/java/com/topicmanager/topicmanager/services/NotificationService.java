package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.entities.ActionItem;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.MeetingTopic;
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
                
                <h2 style="color: #333;">Você foi convidado para o Topic Manager</h2>

                <p style="font-size: 15px; color: #555;">
                    Olá,<br><br>
                    Você foi convidado para criar uma conta no aplicativo Topic Manager.
                    Clique no botão abaixo para completar seu cadastro:
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
                    ">Criar Conta</a>
                </p>

                <p style="font-size: 13px; color: #999;">
                    Se o botão acima não funcionar, copie e cole este link no seu navegador:<br>
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

    public void sendActionItem(ActionItem actionItem) {

        String actorName = actionItem.getActor().getName();
        String senderName = actionItem.getSender().getName();
        String createdDate = actionItem.getCreatedDate().toLocalDate().toString();
        String comment = actionItem.getComment();

        MeetingTopic topic = actionItem.getTopic();
        Meeting meeting = topic.getMeeting();

        String meetingTitle = meeting.getTitle();
        String topicTitle = topic.getTitle();

        String link = domain + "/login";

        String htmlBody = """
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
            <div style="max-width: 600px; background-color: #ffffff; border-radius: 8px; padding: 25px;">
    
                <h2 style="color: #333;">Você possui uma Tarefa Pendiente</h2>
    
                <p style="font-size: 15px; color: #555;">
                    Olá %s,<br><br>
                    Você possui uma tarefa pendente atribuída a você no sistema Topic Manager.
                </p>
    
                <div style="background-color: #fafafa; padding: 15px 20px; border-left: 4px solid #4A6CF7; margin: 25px 0;">
    
                    <p style="margin: 5px 0; font-size: 14px;">
                        <strong>Responsável pela atribuição:</strong> %s
                    </p>
    
                    <p style="margin: 5px 0; font-size: 14px;">
                        <strong>Data de criação:</strong> %s
                    </p>
    
                    <p style="margin: 12px 0 0 0; font-size: 14px;">
                        <strong>Reunião:</strong> %s
                    </p>
    
                    <p style="margin: 5px 0 12px 0; font-size: 14px;">
                        <strong>Tópico:</strong> %s
                    </p>
    
                    <p style="margin-top: 20px; font-size: 14px;">
                        <strong>Comentário:</strong><br>
                        %s
                    </p>
    
                </div>
    
                <p style="text-align: center; margin: 35px 0;">
                    <a href="%s" style="
                        background-color: #4A6CF7;
                        padding: 12px 22px;
                        border-radius: 6px;
                        color: white;
                        text-decoration: none;
                        font-size: 16px;
                        display: inline-block;
                    ">Ver Tarefa</a>
                </p>
    
                <p style="font-size: 13px; color: #999;">
                    Se o botão acima não funcionar, copie e cole este link no navegador:<br>
                    <span style="color: #4A6CF7;">%s</span>
                </p>
    
            </div>
        </div>
        """.formatted(
                actorName,
                senderName,
                createdDate,
                meetingTitle,
                topicTitle,
                comment,
                link,
                link
        );

        try {
            sendHtml(
                    actionItem.getActor().getEmail(),
                    "Você possui uma tarefa pendente",
                    htmlBody
            );
        } catch (MessagingException e) {
            throw new RuntimeException("Falha ao enviar e-mail de tarefa pendente", e);
        }
    }
}
