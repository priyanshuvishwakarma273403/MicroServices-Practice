package com.product_service.ProductService.service;

import com.product_service.ProductService.model.Product;
import com.product_service.ProductService.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;

    @CacheEvict(value = {"product-list", "top-rated", "categories"}, allEntries = true)
    public Product createProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        Product saved = productRepo.save(product);
        log.info("Product created: {} [{}]", saved.getId(), saved.getName());
        return saved;
    }

    @Cacheable(value = "products", key = "#id")
    public Product getProduct(String id) {
        log.info("DB hit for product : {} " , id);
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("product not found" + id));
    }

    @CachePut(value = "products", key = "#id")
    @CacheEvict(value = {"product-list", "top-rated"}, allEntries = true)
    public Product updateProduct(String id, Product updated) {
        Product existing = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("product not found" + id));

        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setStock(updated.getStock());
        existing.setCategory(updated.getCategory());
        existing.setBrand(updated.getBrand());
        existing.setImageUrls(updated.getImageUrls());
        existing.setUpdatedAt(LocalDateTime.now());

        return productRepo.save(existing);
    }

    @CacheEvict(value = {"products", "product-list", "top-rated", "categories"}, allEntries = true)
    public void deleteProduct(String id) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("product not found" + id));
        product.setActive(false);
        productRepo.save(product);
        log.info("Product soft-deleted: {}", id);
    }

    public Page<Product> search(String keyword, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        return productRepo.searchProducts(keyword, pageable);
    }

    @Cacheable(value = "product-list", key = "#category + '_' + #page")
    public Page<Product> getByCategory(String category, int page , int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return productRepo.findByCategoryAndActiveTrue( category,pageable);
    }

    @Cacheable(value = "top-rated")
    public List<Product> getTopRated() {
        log.info("Fetching top rated products from DB");
        return productRepo.findTop10ByActiveTrueOrderByRatingDesc();
    }

    public boolean checkAndReduceStock(String productId, int qty){
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found : " + productId));

        if(product.getStock() < qty){
            return false;
        }

        product.setStock(product.getStock() - qty);
        product.setUpdatedAt(LocalDateTime.now());
        productRepo.save(product);

        log.info("Stock reduced for {}: {} -> {}", productId, product.getStock() + qty, product.getStock());
        return true;
    }


    public List<Product> getProductsByIds(List<String> ids) {
        return productRepo.findByIdInAndActiveTrue(ids);
    }
}
