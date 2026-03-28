package com.order_service.OrderService.kafka;

import lombok.*;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderPlacedEvent extends BaseEvent {
    private Long orderId;
    private Long userId;
    private Double totalAmount;
    private String shippingAddress;
    private List<OrderItemDto> items;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemDto {
        private String productId;
        private String productName;
        private Integer quantity;
        private Double price;
    }
}
