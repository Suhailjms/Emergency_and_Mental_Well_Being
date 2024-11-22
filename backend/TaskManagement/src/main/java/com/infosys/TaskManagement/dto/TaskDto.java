package com.infosys.TaskManagement.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TaskDto {

    private int id;
    private int userId;

    private String title;
    private String description;
    private String frequency;
    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
    private boolean isCompleted;
}
