package com.infosys.TaskManagement.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id" , nullable= false)
    private int userId;

    private String title;
    private String description;
    private String frequency;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "is_completed")
    private boolean isCompleted;
}
