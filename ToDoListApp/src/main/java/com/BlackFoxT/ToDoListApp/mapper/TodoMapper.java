package com.BlackFoxT.ToDoListApp.mapper;

import com.BlackFoxT.ToDoListApp.dto.TodoDTO;
import com.BlackFoxT.ToDoListApp.model.Todo;
import com.BlackFoxT.ToDoListApp.model.User;
import com.BlackFoxT.ToDoListApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TodoMapper {

    private final UserRepository userRepository;

    @Autowired
    public TodoMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public TodoDTO convertToDto(Todo todo) {
        return new TodoDTO(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.getTodoType(),
                todo.getCompleted(),
                todo.getUser().getId(),
                todo.getLastUpdated()
        );
    }

    public Todo convertToEntity(TodoDTO todoDTO) {
        User user = userRepository.findById(todoDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + todoDTO.getUserId()));
        Todo todo = new Todo();
        todo.setId(todoDTO.getId());
        todo.setTitle(todoDTO.getTitle());
        todo.setDescription(todoDTO.getDescription());
        todo.setTodoType(todoDTO.getTodoType());
        todo.setCompleted(todoDTO.getCompleted());
        todo.setLastUpdated(todoDTO.getLastUpdated());
        todo.setUser(user);

        return todo;
    }
}
