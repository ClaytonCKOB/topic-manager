package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.dto.TopicVoteDTO;
import com.topicmanager.topicmanager.entities.ActionItem;
import com.topicmanager.topicmanager.entities.TopicVote;
import com.topicmanager.topicmanager.repositories.TopicVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicVoteService {

    @Autowired
    TopicVoteRepository topicVoteRepository;

    @Autowired
    ActionItemService actionItemService;

    public void setTopicVote(TopicVoteDTO topicVote) {
        // TODO: use constants
        if (topicVote.status().equals(3) && (topicVote.comment() == null || topicVote.comment().trim().isEmpty())) {
            throw new IllegalArgumentException("Comentário é obrigatório para votos de diligência");
        }

        Optional<ActionItem> pendingDiligencia = actionItemService.findPendingActionItemByTopic(topicVote.meeting_topic_id());

        if (pendingDiligencia.isPresent()) {
            TopicVote existingVote = topicVoteRepository.findByMeetingTopicIdAndUserId(
                topicVote.meeting_topic_id(),
                topicVote.user_account_id()
            );

            boolean isOriginalDiligenciaCreator = existingVote != null
                && existingVote.getStatus() == 3
                && existingVote.getUser().getId().equals(topicVote.user_account_id());

            if (!isOriginalDiligenciaCreator) {
                throw new IllegalArgumentException(
                    "Não é possível votar neste tópico enquanto houver uma diligência pendente. " +
                    "Aguarde a resolução da diligência para poder votar."
                );
            }
        }

        TopicVote existingTopicVote = topicVoteRepository.findByMeetingTopicIdAndUserId(topicVote.meeting_topic_id(), topicVote.user_account_id());

        // Check if user is changing from diligência (status 3) to another status
        boolean wasInDiligencia = existingTopicVote != null && existingTopicVote.getStatus() == 3;
        boolean isLeavingDiligencia = wasInDiligencia && !topicVote.status().equals(3);

        if (existingTopicVote == null) {
            TopicVote newTopicVote = new TopicVote(topicVote);
            topicVoteRepository.save(newTopicVote);
        } else {
            existingTopicVote.setStatus(topicVote.status());
            existingTopicVote.setComment(topicVote.comment());
            topicVoteRepository.save(existingTopicVote);
        }

        // If changing from diligência to another status, complete the pending ActionItem
        if (isLeavingDiligencia && pendingDiligencia.isPresent()) {
            actionItemService.completeActionItem(pendingDiligencia.get().getId());
        }

        // If voting for diligência, create new ActionItem
        if (topicVote.status().equals(3)) {
            actionItemService.createActionItem(
                    topicVote.meeting_topic_id(),
                    topicVote.user_account_id(),
                    topicVote.comment()
            );
        }
    }

    public List<TopicVote> getTopicVotesByTopicId(Long topicId) {
        return topicVoteRepository.findByMeetingTopicId(topicId);
    }

}
