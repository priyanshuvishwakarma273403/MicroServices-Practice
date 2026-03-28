package com.product_service.ProductService.controller;

import com.product_service.ProductService.model.Review;
import com.product_service.ProductService.service.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<Page<Review>> getReviews(
            @PathVariable String productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok(reviewService.getReviews(productId, page, size));
    }

    @PostMapping
    public ResponseEntity<Review> addReview(
            @PathVariable String productId,
            @Valid @RequestBody ReviewRequest req
    ){
        Review review = reviewService.addReview(
                productId,
                req.userId,
                req.userName,
                req.rating,
                req.title,
                req.comment
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(review);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @PathVariable String productId,
            @PathVariable String reviewId,
            @RequestParam Long userId) {
        reviewService.deleteReview(productId, reviewId, userId);
        return ResponseEntity.ok(Map.of("message", "Review deleted"));
    }

    @Data
    static class ReviewRequest {

        @NotNull
        private Long userId;

        @NotBlank
        private String userName;

        @Min(1)
        @Max(5)
        @NotNull
        private Integer rating;

        @NotBlank
        private String title;

        @NotBlank
        @Size(min = 10, max = 1000)
        private String comment;
    }

}
