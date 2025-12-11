package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.ActionItemDTO;
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

    @GetMapping("/{actorId}")
    public ResponseEntity<List<ActionItemDTO>> listActionItems(@PathVariable Long actorId){
        List<ActionItemDTO> actionItems = actionItemService.listActionItemsByActor(actorId);
        return ResponseEntity.ok(actionItems);
    }

    @PostMapping("/{actionItemId}")
    public ResponseEntity completeActionItem(@PathVariable Long actionItemId){
        actionItemService.completeActionItem(actionItemId);
        return ResponseEntity.ok().build();
    }

}
