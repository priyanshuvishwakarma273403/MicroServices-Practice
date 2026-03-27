package com.user_service.User_Service.service;

import com.user_service.User_Service.config.JwtUtil;
import com.user_service.User_Service.model.User;
import com.user_service.User_Service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final StringRedisTemplate redis;

    public Map<String, Object> register(String name, String email, String password){
        if(userRepo.existsByEmail(email)){
            throw new RuntimeException("Email Already Exists " + email);
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();

        user = userRepo.save(user);
        log.info("New user registered : {} ", email);

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());
        return buildAuthResponse(user, token);

    }
    public Map<String, Object> login(String email, String password){
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        redis.opsForValue().set(
                "session :" +user.getId(),
                token,
                24, TimeUnit.HOURS
        );

        log.info("User logged in: {}", email);
        return buildAuthResponse(user, token);
    }

    public void logout(String token){
        jwtUtil.blacklistToken(token);
        log.info("Token blacklisted (logout)");
    }

    public Map<String, Object> getProfile(Long userId){
        String cachekey = "user:profile:" + userId;

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found " + userId));

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("name", user.getName());
        profile.put("email", user.getEmail());
        profile.put("role", user.getRole());
        profile.put("createdAt", user.getCreatedAt());
        return profile;

    }

    public Map<String, Object> validateToken(String token){
        if(!jwtUtil.isValid(token)){
            throw new RuntimeException("Invalid or expired Token");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("valid", true);
        result.put("userId", jwtUtil.getUserId(token));
        result.put("email", jwtUtil.getEmail(token));
        return result;
    }

    private Map<String, Object> buildAuthResponse(User user, String token){
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", token);
        response.put("tokenType", "Bearer");
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        return response;
    }

}
