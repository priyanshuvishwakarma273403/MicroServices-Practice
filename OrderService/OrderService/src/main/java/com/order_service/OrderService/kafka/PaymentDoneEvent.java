package com.order_service.OrderService.kafka;


import lombok.*;

@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDoneEvent extends BaseEvent{
    private Long orderId;
    private String paymentId;
    private String status;
    private Double amount;

}
