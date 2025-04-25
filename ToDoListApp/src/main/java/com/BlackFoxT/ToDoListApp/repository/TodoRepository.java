package com.BlackFoxT.ToDoListApp.repository;

import com.BlackFoxT.ToDoListApp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUserId(Long userId);
    Optional<Todo> findByIdAndUserId(Long todoId, Long userId);

}
