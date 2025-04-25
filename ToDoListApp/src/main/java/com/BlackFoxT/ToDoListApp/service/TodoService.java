package com.BlackFoxT.ToDoListApp.service;

import com.BlackFoxT.ToDoListApp.model.Todo;
import com.BlackFoxT.ToDoListApp.mapper.TodoMapper;
import com.BlackFoxT.ToDoListApp.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    public TodoService(TodoRepository todoRepository, TodoMapper todoMapper) {
        this.todoRepository = todoRepository;
        this.todoMapper = todoMapper;
    }

    public List<Todo> getTodosByUserId(Long userId) {
        System.out.println("Fetching todos for userId: " + userId);
        List<Todo> list = todoRepository.findByUserId(userId);
        System.out.println("Found todos: " + list.size());
        return list;
    }

    public Todo getTodoByIdAndUserId(Long todoId, Long userId) {
        return todoRepository.findByIdAndUserId(todoId, userId).orElse(null);
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public void deleteTodo(Todo todo) {
        todoRepository.delete(todo);
    }
}
