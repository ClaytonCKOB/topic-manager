package com.topicmanager.topicmanager.controllers;

import com.topicmanager.topicmanager.dto.ActionItemDTO;
import com.topicmanager.topicmanager.entities.ActionItem;
import com.topicmanager.topicmanager.services.ActionItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/action-item")
@Tag(name = "Action Items", description = "Action item management endpoints")
public class ActionItemController {

    @Autowired
    ActionItemService actionItemService;

    @GetMapping("/{actorId}")
    @Operation(summary = "List action items by actor", description = "Get all action items assigned to a specific user")
    public ResponseEntity<List<ActionItemDTO>> listActionItems(
            @Parameter(description = "Actor (User) ID") @PathVariable Long actorId){
        List<ActionItemDTO> actionItems = actionItemService.listActionItemsByActor(actorId);
        return ResponseEntity.ok(actionItems);
    }

    @PostMapping("/{actionItemId}")
    @Operation(summary = "Complete action item", description = "Mark an action item as completed")
    public ResponseEntity completeActionItem(
            @Parameter(description = "Action Item ID") @PathVariable Long actionItemId){
        actionItemService.completeActionItem(actionItemId);
        return ResponseEntity.ok().build();
    }

}
