package com.product_service.ProductService.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private String id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String category;
    private String brand;
    private List<String> imageUrls;
    private Double rating;
    private Integer reviewCount;
    private Boolean active;
    private String createdAt;
}
