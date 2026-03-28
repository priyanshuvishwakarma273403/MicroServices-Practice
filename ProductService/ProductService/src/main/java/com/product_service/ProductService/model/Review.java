package com.product_service.ProductService.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;


@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review implements Serializable {

    @Id
    private String id;

    @Indexed
    private String productId;

    private Long userId;

    private String userName;

    @Builder.Default
    private Integer rating = 5;    // 1 to 5

    private String title;

    private String comment;

    private Boolean verified; // verified purchase?

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
