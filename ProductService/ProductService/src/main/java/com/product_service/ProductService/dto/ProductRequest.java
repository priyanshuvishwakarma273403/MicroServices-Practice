package com.product_service.ProductService.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {
    @NotBlank(message = "Product name required")
    private String name;

    @NotBlank(message = "Description required")
    private String description;

    @NotNull(message = "Price required")
    @DecimalMin(value = "0.01", message = "Price must be > 0")
    private Double price;

    @NotNull(message = "Stock required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    @NotBlank(message = "Category required")
    private String category;

    private String brand;

    private List<String> imageUrls;
}
