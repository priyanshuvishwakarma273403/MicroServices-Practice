package com.cart_services.CartServices.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart implements Serializable {

    private Long userId;

    private Map<String, CartItem> items = new HashMap<>();

    public Double getTotalAmount(){
        return items.values().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    public int getTotalItems(){
        return items.values().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class CartItem implements Serializable {
        private String productId;
        private String productName;
        private Double price;
        private Integer quantity;
        private String imageUrl;
    }
}
