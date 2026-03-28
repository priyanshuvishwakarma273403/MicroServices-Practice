package com.product_service.ProductService.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexOperations;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class MongoIndexConfig {

    private final MongoTemplate mongoTemplate;

    // App start pe indexes ensure karo
    @Bean
    public CommandLineRunner ensureIndexes() {
        return args -> {
            try {
                IndexOperations productOps = mongoTemplate.indexOps("products");


                productOps.ensureIndex(
                        new Index().on("category", Sort.Direction.ASC)
                                .on("active", Sort.Direction.ASC)
                                .named("idx_category_active")
                );


                productOps.ensureIndex(
                        new Index().on("rating", Sort.Direction.DESC)
                                .on("active", Sort.Direction.ASC)
                                .named("idx_rating_active")
                );


                productOps.ensureIndex(
                        new Index().on("price", Sort.Direction.ASC)
                                .named("idx_price")
                );


                IndexOperations reviewOps = mongoTemplate.indexOps("reviews");

                reviewOps.ensureIndex(
                        new Index().on("productId", Sort.Direction.ASC)
                                .named("idx_review_product")
                );


                reviewOps.ensureIndex(
                        new Index().on("productId", Sort.Direction.ASC)
                                .on("userId", Sort.Direction.ASC)
                                .unique()
                                .named("idx_review_product_user_unique")
                );

                log.info("MongoDB indexes ensured successfully.");
            } catch (Exception e) {
                log.warn("Index creation skipped: {}", e.getMessage());
            }
        };
    }

}
