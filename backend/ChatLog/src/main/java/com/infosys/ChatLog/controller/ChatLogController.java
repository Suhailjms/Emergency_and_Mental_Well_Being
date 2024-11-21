package com.infosys.ChatLog.controller;

import com.infosys.ChatLog.dto.MessageRequestDto;
import com.infosys.ChatLog.model.ChatLog;
import com.infosys.ChatLog.service.ChatLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class ChatLogController {

    private static final Logger logger = Logger.getLogger(ChatLogController.class.getName());

    @Autowired
    private ChatLogService chatLogService;

    // Endpoint to send a message and get a response
    @PostMapping("/send")
    public String sendMessage(@RequestBody MessageRequestDto messageRequestDto) {
        try {
            return chatLogService.sendMessage(messageRequestDto.getQuery(), messageRequestDto.getUserId());
        } catch (Exception e) {
            logger.severe("Error in /send endpoint: " + e.getMessage());
            return "An error occurred while processing the message.";
        }
    }

    // Endpoint to get chat history for a user
    @GetMapping("/history/{userId}")
    public List<ChatLog> getChatHistory(@PathVariable int userId) {
        try {
            return chatLogService.getChatHistory(userId);
        } catch (Exception e) {
            logger.severe("Error in /history endpoint: " + e.getMessage());
            return null;
        }
    }
}
