package com.BlackFoxT.ToDoListApp.controller;

import com.BlackFoxT.ToDoListApp.dto.UserDTO;
import com.BlackFoxT.ToDoListApp.mapper.UserMapper;
import com.BlackFoxT.ToDoListApp.model.User;
import com.BlackFoxT.ToDoListApp.service.UserService;
import com.BlackFoxT.ToDoListApp.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService,
                          JwtUtil jwtUtil,
                          UserMapper userMapper,
                          PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Void> redirectToTodoPage(@PathVariable Long userId) {
        return ResponseEntity.status(302)
                .header("Location", "/user/" + userId + "/todo")
                .build();
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> getProfile(@PathVariable Long userId, @RequestHeader("Authorization") String token) {
        String c_token = token.substring(7);
        String email = jwtUtil.extractEmail(c_token);
        User user = userService.getUserByEmail(email);

        if (user == null || !user.getId().equals(userId)) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }

        UserDTO userDTO = userMapper.toDto(user);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId,
                                           @RequestBody UserDTO userDTO,
                                           @RequestHeader("Authorization") String token) {
        try {
            String c_token = token.substring(7);
            String email = jwtUtil.extractEmail(c_token);

            User authenticatedUser = userService.getUserByEmail(email);

            if (authenticatedUser == null || !authenticatedUser.getId().equals(userId)) {
                return ResponseEntity.status(403).body("Unauthorized access");
            }

            authenticatedUser.setUsername(userDTO.getUsername());

            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                authenticatedUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }

            userService.updateUser(authenticatedUser);

            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the profile.");
        }
    }

}
