package com.BlackFoxT.ToDoListApp.dto;

import java.util.List;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private List<TodoDTO> todos;

    public UserDTO() {
    }

    public UserDTO(Long id, String username, String email, String password, List<TodoDTO> todos) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.todos = todos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<TodoDTO> getTodos() {
        return todos;
    }

    public void setTodos(List<TodoDTO> todos) {
        this.todos = todos;
    }
}
