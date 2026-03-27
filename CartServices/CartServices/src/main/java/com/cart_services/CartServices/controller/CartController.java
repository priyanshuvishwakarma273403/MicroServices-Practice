package com.cart_services.CartServices.controller;

import com.cart_services.CartServices.model.Cart;
import com.cart_services.CartServices.service.CartService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @GetMapping("/{userId}/summary")
    public ResponseEntity<Map<String, Object>> getSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartSummary(userId));
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<Cart> addItem(@PathVariable Long userId,
                                        @RequestBody AddItemRequest req){
        Cart.CartItem item = Cart.CartItem.builder()
                .productId(req.productId)
                .productName(req.productName)
                .price(req.price)
                .quantity(req.quantity)
                .imageUrl(req.imageUrl)
                .build();
        return ResponseEntity.ok(cartService.addItem(userId, item));
    }


    @PutMapping("/{userId}/items/{productId}")
    public ResponseEntity<Cart> updateQty(@PathVariable Long userId,
                                          @PathVariable String productId,
                                          @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(userId, productId, quantity));
    }


    @DeleteMapping("/{userId}/items/{productId}")
    public ResponseEntity<Cart> removeItem(@PathVariable Long userId,
                                           @PathVariable String productId) {
        return ResponseEntity.ok(cartService.removeItem(userId, productId));
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok(Map.of("message", "Cart cleared"));
    }

    @Data
    static class AddItemRequest {
        private String productId;
        private String productName;
        private Double price;
        private Integer quantity;
        private String imageUrl;
    }

}
