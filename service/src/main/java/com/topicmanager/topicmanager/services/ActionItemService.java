package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.ActionItemDTO;
import com.topicmanager.topicmanager.entities.ActionItem;
import com.topicmanager.topicmanager.entities.Meeting;
import com.topicmanager.topicmanager.entities.MeetingTopic;
import com.topicmanager.topicmanager.entities.UserAccount;
import com.topicmanager.topicmanager.repositories.ActionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActionItemService {

    @Autowired
    private ActionItemRepository actionItemRepository;

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private MeetingTopicService meetingTopicService;

    @Autowired
    private MeetingParticipantService meetingParticipantService;

    @Autowired
    private NotificationService notificationService;

    public List<ActionItemDTO> listActionItemsByActor(Long id) {
        List<ActionItem> actionItemList = actionItemRepository.findByActorIdAndCompletedFalse(id);

        return actionItemList.stream().map(actionItem -> {
            MeetingTopic meetingTopic = actionItem.getTopic();
            Meeting meeting = meetingTopic.getMeeting();
            return new ActionItemDTO(
                actionItem.getId(),
                meetingTopic.getId(),
                meetingTopic.getTitle(),
                meeting.getId(),
                meeting.getTitle(),
                actionItem.getSender().getName(),
                actionItem.getComment(),
                actionItem.getCreatedDate()
            );
        }).toList();
    }

    public void completeActionItem(Long actionItemId) {
        ActionItem actionItem = actionItemRepository.findById(actionItemId).get();
        actionItem.setCompleted(true);
        actionItem.setCompletedDate(LocalDateTime.now());
        actionItemRepository.save(actionItem);
    }

    public void createActionItem(Long meetingTopicId, Long senderId, String comment) {
        MeetingTopic meetingTopic = meetingTopicService.getMeetingTopicById(meetingTopicId);
        UserAccount sender = userAccountService.getUser(senderId);
        UserAccount actor = meetingParticipantService.getMeetingBossById(meetingTopic.getMeeting().getId());
        Meeting meeting = meetingTopic.getMeeting();
        ActionItem actionItem = new ActionItem();
        actionItem.setTopic(meetingTopic);
        actionItem.setActor(actor);
        actionItem.setSender(sender);
        actionItem.setComment(comment);
        actionItem.setCompleted(false);
        actionItemRepository.save(actionItem);

        notificationService.sendActionItem(actionItem);
    }
}
