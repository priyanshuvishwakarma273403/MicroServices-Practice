package com.cart_services.CartServices.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

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
