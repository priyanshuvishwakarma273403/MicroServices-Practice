package com.user_service.User_Service.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;


@Slf4j
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private final StringRedisTemplate redis;

    public JwtUtil(StringRedisTemplate redis) {
        this.redis = redis;
    }

    private Key getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(Long userId, String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId",userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() +expiration))
                .signWith(getKey())
                .compact();
    }

    public String getEmail(String token) {
        return getClaims(token).getSubject();
    }

    public Long getUserId(String token) {
        return getClaims(token).get("userId", Long.class);
    }

    public boolean isValid(String token) {
        try{
            getClaims(token);
            String blacklisted = redis.opsForValue().get("blacklisted: "+ token);
            return blacklisted == null;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid JWT : {} ",e.getMessage());
            return false;
        }
    }

    public void blacklistToken(String token){
        long remaining = getClaims(token).getExpiration().getTime() - System.currentTimeMillis();

        if(remaining > 0){
            redis.opsForValue().set("blacklist:" + token, "1", remaining, TimeUnit.MILLISECONDS);
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
