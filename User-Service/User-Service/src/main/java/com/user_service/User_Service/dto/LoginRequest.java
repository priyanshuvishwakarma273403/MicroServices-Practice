package com.user_service.User_Service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @Email
    @NotBlank
    public String email;

    @NotBlank
    public String password;

}
