package com.BlackFoxT.ToDoListApp.dto;

import java.time.LocalDateTime;

public class TodoDTO {
    private Long id;
    private String title;
    private String description;
    private String todoType;
    private Boolean completed;
    private Long userId;
    private LocalDateTime lastUpdated;

    public TodoDTO() {
    }

    public TodoDTO(Long id, String title, String description, String todoType, Boolean completed, Long userId, LocalDateTime lastUpdated) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.todoType = todoType;
        this.completed = completed;
        this.userId = userId;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTodoType() {
        return todoType;
    }

    public void setTodoType(String todoType) {
        this.todoType = todoType;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
