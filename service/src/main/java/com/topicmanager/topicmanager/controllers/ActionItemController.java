package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.entities.ActionItem;
import com.topicmanager.topicmanager.services.ActionItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/action-item")
public class ActionItemController {

    @Autowired
    ActionItemService actionItemService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ActionItem>> listActionItems(@PathVariable Long actorId){
        List<ActionItem> actionItems = actionItemService.listActionItemsByActor(actorId);
        return ResponseEntity.ok(actionItems);
    }

    @PostMapping("/{id}")
    public ResponseEntity completeActionItem(@PathVariable Long actionItemId){
        actionItemService.completeActionItem(actionItemId);
        return ResponseEntity.ok().build();
    }

}
