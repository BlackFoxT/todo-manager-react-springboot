package com.BlackFoxT.ToDoListApp.mapper;

import com.BlackFoxT.ToDoListApp.dto.TodoDTO;
import com.BlackFoxT.ToDoListApp.dto.UserDTO;
import com.BlackFoxT.ToDoListApp.model.Todo;
import com.BlackFoxT.ToDoListApp.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    private final TodoMapper todoMapper;

    public UserMapper(TodoMapper todoMapper) {
        this.todoMapper = todoMapper;
    }

    public UserDTO toDto(User user) {
        List<TodoDTO> todoDTOs = user.getTodos()
                .stream()
                .map(todoMapper::convertToDto)
                .collect(Collectors.toList());

        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                todoDTOs
        );
    }

    public User toEntity(UserDTO userDTO) {
        List<Todo> todos = userDTO.getTodos()
                .stream()
                .map(todoMapper::convertToEntity)
                .collect(Collectors.toList());

        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setTodos(todos);

        todos.forEach(todo -> todo.setUser(user));

        return user;
    }
}
