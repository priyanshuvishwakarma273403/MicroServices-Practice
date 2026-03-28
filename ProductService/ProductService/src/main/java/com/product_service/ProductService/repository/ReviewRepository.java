package com.product_service.ProductService.repository;

import com.product_service.ProductService.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {

    Page<Review> findByProductIdOrderByCreatedAtDesc(String productId, Pageable pageable);

    Optional<Review> findByProductIdAndUserId(String productId, Long userId);

    boolean existsByProductIdAndUserId(String productId, Long userId);

    long countByProductId(String productId);

    @Aggregation(pipeline = {
            "{ $match: { productId: ?0 } }",
            "{ $group: { _id: null, avgRating: { $avg: '$rating' } } }"
    })
    AverageResult findAverageRatingByProductId(String productId);

    interface AverageResult {
        Double getAvgRating();
    }

}
