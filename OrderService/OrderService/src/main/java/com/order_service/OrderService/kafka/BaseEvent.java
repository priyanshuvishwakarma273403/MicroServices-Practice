package com.order_service.OrderService.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseEvent {
    protected String eventId = UUID.randomUUID().toString();
    protected LocalDateTime timestamp = LocalDateTime.now();
}
