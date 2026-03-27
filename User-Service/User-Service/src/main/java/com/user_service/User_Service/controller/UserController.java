package com.user_service.User_Service.controller;

import com.user_service.User_Service.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req){
        Map<String, Object> response = userService.register(req.name, req.password, req.email);
        return  ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req){
        Map<String, Object> response = userService.login(req.email, req.password);
        return  ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader){
        String token = authHeader.replace("Bearer ", "");
        userService.logout(token);
        return  ResponseEntity.ok(Map.of("message", "logged out successfully"));
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<?> getProfile(@PathVariable Long id){
        return ResponseEntity.ok(userService.getProfile(id));
    }

    @GetMapping("/validate")
    public ResponseEntity<?>  validate(@RequestHeader("Authorization") String authHeader){
        String token = authHeader.replace("Bearer ", "");
        return  ResponseEntity.ok(userService.validateToken(token));
    }


    @Data
    static class RegisterRequest{
        @NotBlank
        public String name;

        @Email
        @NotBlank
        public String email;

        @Size(min = 6)
        @NotBlank
        public String password;
    }

    @Data
    static class LoginRequest{
        @Email
        @NotBlank
        public String email;

        @NotBlank
        public String password;

    }

}
