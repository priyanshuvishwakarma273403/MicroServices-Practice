package com.product_service.ProductService.service;

import com.product_service.ProductService.model.Product;
import com.product_service.ProductService.model.Review;
import com.product_service.ProductService.repository.ProductRepository;
import com.product_service.ProductService.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final ProductRepository productRepo;

    @CacheEvict(value = "products", key = "#productId")
    public Review addReview(String productId, Long userId, String userName,
                            Integer rating, String title, String comment) {

        if(reviewRepo.existsByProductIdAndUserId(productId, userId)){
            throw new RuntimeException("You have already review this product");
        }

        productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found " + productId));

        Review review = Review.builder()
                .productId(productId)
                .userId(userId)
                .userName(userName)
                .rating(rating)
                .title(title)
                .comment(comment)
                .verified(false)
                .build();

        review = reviewRepo.save(review);
        log.info("Review added: productId={} userId={} rating={}", productId, userId, rating);

        updateProductRating(productId);

        return review;
    }

    public Page<Review> getReviews(String productId, int page, int size) {

        return reviewRepo.findByProductIdOrderByCreatedAtDesc(
                productId,
                PageRequest.of(page, size, Sort.by("createdAt").descending())
        );
    }

    @CacheEvict(value = "products", key = "#productId")
    public void deleteReview(String productId, String reviewId, Long userId) {
        Review review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this review");
        }

        reviewRepo.delete(review);
        updateProductRating(productId);
        log.info("Review deleted: reviewId={} by userId={}", reviewId, userId);

    }


    private void updateProductRating(String productId) {
        ReviewRepository.AverageResult result =
                reviewRepo.findAverageRatingByProductId(productId);

        long count = reviewRepo.countByProductId(productId);

        Product product = productRepo.findById(productId).orElse(null);
        if (product == null) return;

        double avg = (result != null && result.getAvgRating() != null)
                ? Math.round(result.getAvgRating() * 10.0) / 10.0
                : 0.0;

        product.setRating(avg);
        product.setReviewCount((int) count);
        productRepo.save(product);
        log.info("Product {} rating updated: {} ({} reviews)", productId, avg, count);
    }

}
