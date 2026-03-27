package com.user_service.User_Service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name required")
    public String name;

    @Email( message = "Valid email required")
    @NotBlank
    public String email;

    @Size(min = 6 , message = "Password min 6 chars")
    @NotBlank
    public String password;

}
