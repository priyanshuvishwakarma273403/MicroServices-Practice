package com.user_service.User_Service.dto;

import lombok.Data;

@Data
public class UserProfileResponse {
    public Long id;
    public String name;
    public String email;
    public String role;
    public String createdAt;

}
