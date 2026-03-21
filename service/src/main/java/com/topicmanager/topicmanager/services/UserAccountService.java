package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.UserDTO;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.enums.UserAccountRole;
import com.topicmanager.topicmanager.repositories.MeetingRepository;
import com.topicmanager.topicmanager.repositories.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private MeetingParticipantService meetingParticipantService;

    public List<UserAccount> listNotAdminUsers() {
        return userAccountRepository.findByRoleNot(UserAccountRole.ADMIN);
    }

    public List<UserAccount> listActiveUsers() {
        return userAccountRepository.findByActiveTrue();
    }

    public List<UserAccount> list() {
        return userAccountRepository.findAll();
    }

    public void delete(Long userAccountId) {
        UserAccount userAccount = getUser(userAccountId);
        userAccount.setActive(false);
        userAccountRepository.save(userAccount);
    }

    public void update(UserDTO userDTO) {
        UserAccount user = getUser(userDTO.id());
        user.setName(userDTO.name());
        user.setEmail(userDTO.email());

        userAccountRepository.save(user);
    }

    public UserAccount getUser(Long id) {
        return userAccountRepository.findById(id).get();
    }

    public void addUserToOpenMeetings(UserAccount user) {
        LocalDateTime now = LocalDateTime.now();
        List<Meeting> openMeetings = meetingRepository.findByStartDateBeforeAndEndDateAfter(now, now);
        
        for (Meeting meeting : openMeetings) {
            meetingParticipantService.createMeetingParticipant(user, meeting.getId());
        }
    }
}
