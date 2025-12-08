package com.topicmanager.topicmanager.services;

import com.topicmanager.topicmanager.entities.ActionItem;
import com.topicmanager.topicmanager.repositories.ActionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActionItemService {

    @Autowired
    private ActionItemRepository actionItemRepository;

    public List<ActionItem> listActionItemsByActor(Long id) {
        return new ArrayList<>();
    }

    public void completeActionItem(Long actionItemId) {
    }

    public void createActionItem() {
    }
}
