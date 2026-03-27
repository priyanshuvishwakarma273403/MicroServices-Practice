package com.user_service.User_Service.dto;

import lombok.Data;

@Data
public class AuthResponse {

    public String accessToken;
    public String tokenType = "Bearer";
    public Long userId;
    public String name;
    public String email;
    public String role;

    public AuthResponse(String token, Long userId, String name, String email, String role) {
        this.accessToken = token;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

}
