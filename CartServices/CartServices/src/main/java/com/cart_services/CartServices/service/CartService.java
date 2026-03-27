package com.cart_services.CartServices.service;


import com.cart_services.CartServices.model.Cart;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${cart.ttl-minutes:1440}")
    private long cartTtlMinutes;

    @Value("${cart.max-items:50}")
    private int maxItems;


    private String cartKey(Long userId) {
        return "cart:" + userId;
    }


    public Cart getCart(Long userId) {
        Cart cart = (Cart) redisTemplate.opsForValue().get(cartKey(userId));
        if (cart == null) {

            cart = new Cart(userId, new java.util.HashMap<>());
        }
        return cart;
    }

    // ── Add Item ─────────────────────────────────────────────────
    public Cart addItem(Long userId, Cart.CartItem newItem) {
        Cart cart = getCart(userId);

        // Max items check
        if (!cart.getItems().containsKey(newItem.getProductId())
                && cart.getItems().size() >= maxItems) {
            throw new RuntimeException("Cart is full (max " + maxItems + " items)");
        }

        // Agar product already hai to quantity add karo
        cart.getItems().merge(
                newItem.getProductId(),
                newItem,
                (existing, incoming) -> {
                    existing.setQuantity(existing.getQuantity() + incoming.getQuantity());
                    return existing;
                }
        );

        saveCart(userId, cart);
        log.info("Item added to cart. User: {}, Product: {}, Qty: {}",
                userId, newItem.getProductId(), newItem.getQuantity());
        return cart;
    }

    // ── Update Item Quantity ──────────────────────────────────────
    public Cart updateItemQuantity(Long userId, String productId, int quantity) {
        Cart cart = getCart(userId);

        if (!cart.getItems().containsKey(productId)) {
            throw new RuntimeException("Product not in cart: " + productId);
        }

        if (quantity <= 0) {
            // Quantity 0 ya negative = remove karo
            return removeItem(userId, productId);
        }

        cart.getItems().get(productId).setQuantity(quantity);
        saveCart(userId, cart);
        return cart;
    }

    // ── Remove Item ───────────────────────────────────────────────
    public Cart removeItem(Long userId, String productId) {
        Cart cart = getCart(userId);
        cart.getItems().remove(productId);
        saveCart(userId, cart);
        log.info("Item removed from cart. User: {}, Product: {}", userId, productId);
        return cart;
    }

    // ── Clear Cart ────────────────────────────────────────────────
    // Order place hone ke baad call hoga
    public void clearCart(Long userId) {
        redisTemplate.delete(cartKey(userId));
        log.info("Cart cleared for user: {}", userId);
    }

    // ── Get Cart Summary ──────────────────────────────────────────
    public java.util.Map<String, Object> getCartSummary(Long userId) {
        Cart cart = getCart(userId);
        return java.util.Map.of(
                "totalItems", cart.getTotalItems(),
                "totalAmount", cart.getTotalAmount(),
                "itemCount", cart.getItems().size()
        );
    }

    // ── Internal: Save with TTL ───────────────────────────────────
    private void saveCart(Long userId, Cart cart) {
        redisTemplate.opsForValue().set(
                cartKey(userId),
                cart,
                cartTtlMinutes,
                TimeUnit.MINUTES
        );
        // TTL refresh karo — user active hai
        redisTemplate.expire(cartKey(userId), cartTtlMinutes, TimeUnit.MINUTES);
    }
}