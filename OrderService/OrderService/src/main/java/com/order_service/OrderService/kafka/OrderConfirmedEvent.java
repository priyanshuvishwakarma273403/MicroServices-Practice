package com.order_service.OrderService.kafka;


import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderConfirmedEvent extends BaseEvent {
    private Long orderId;
    private Long userId;
    private String paymentId;
    private Double amount;
}
