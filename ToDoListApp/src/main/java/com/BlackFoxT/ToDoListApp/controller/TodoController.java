package com.BlackFoxT.ToDoListApp.controller;

import com.BlackFoxT.ToDoListApp.dto.TodoDTO;
import com.BlackFoxT.ToDoListApp.mapper.TodoMapper;
import com.BlackFoxT.ToDoListApp.model.Todo;
import com.BlackFoxT.ToDoListApp.model.User;
import com.BlackFoxT.ToDoListApp.repository.UserRepository;
import com.BlackFoxT.ToDoListApp.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("user/{userId}/todo")
public class TodoController {

    private final TodoService todoService;
    private final TodoMapper todoMapper;
    private final UserRepository userRepository;

    public TodoController(TodoService todoService, TodoMapper todoMapper, UserRepository userRepository) {
        this.todoService = todoService;
        this.todoMapper = todoMapper;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<TodoDTO> getTodos(@PathVariable Long userId) {
        List<Todo> todos = todoService.getTodosByUserId(userId);
        return todos.stream()
                .map(todoMapper::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable Long userId, @PathVariable Long todoId) {
        Todo todo = todoService.getTodoByIdAndUserId(todoId, userId);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(todoMapper.convertToDto(todo));
    }

    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(@PathVariable Long userId, @RequestBody TodoDTO todoDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Todo todo = new Todo();
        todo.setTitle(todoDTO.getTitle());
        todo.setDescription(todoDTO.getDescription());
        todo.setTodoType(todoDTO.getTodoType());
        todo.setCompleted(todoDTO.getCompleted());
        todo.setLastUpdated(todoDTO.getLastUpdated());
        todo.setUser(user);

        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.ok(todoMapper.convertToDto(createdTodo));
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoDTO> updateTodo(@PathVariable Long userId, @PathVariable Long todoId, @RequestBody TodoDTO todoDTO) {
        Todo existingTodo = todoService.getTodoByIdAndUserId(todoId, userId);

        if (existingTodo == null) {
            return ResponseEntity.notFound().build();
        }

        existingTodo = todoMapper.convertToEntity(todoDTO);
        existingTodo.setId(todoId);

        Todo updatedTodo = todoService.updateTodo(existingTodo);
        return ResponseEntity.ok(todoMapper.convertToDto(updatedTodo));
    }
    @DeleteMapping("/{todoId}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long userId, @PathVariable Long todoId) {
        Todo todo = todoService.getTodoByIdAndUserId(todoId, userId);

        if (todo == null) {
            return ResponseEntity.notFound().build();
        }

        todoService.deleteTodo(todo);
        return ResponseEntity.ok().build();
    }
}
