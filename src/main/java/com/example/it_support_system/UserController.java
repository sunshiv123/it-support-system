package com.example.it_support_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint to register a new user
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // In a real application, you would hash the password here before saving
        return userRepository.save(user);
    }

    // Endpoint to handle user login
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginUser) {
        // Find the user by their email
        User user = userRepository.findByEmail(loginUser.getEmail());

        // Check if the user exists and if the password is correct
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            // For now, we'll return a simple success message
            // In a real app, you would generate a security token here
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}