package com.product_service.ProductService.repository;

import com.product_service.ProductService.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    Page<Product> findByCategoryAndActiveTrue(  String category, Pageable pageable);

    @Query("{ $and: [ { active: true }, { $or: [ " +
            "{ name: { $regex: ?0, $options: 'i' } }, " +
            "{ description: { $regex: ?0, $options: 'i' } }, " +
            "{ brand: { $regex: ?0, $options: 'i' } } ] } ] }")
    Page<Product> searchProducts(String keyword, Pageable pageable);

    Page<Product> findByActiveTrueAndPriceBetween(Double minPrice, Double maxPrice, Pageable pageable);

    List<Product> findByIdInAndActiveTrue(List<String> ids);

    List<Product> findTop10ByActiveTrueOrderByRatingDesc();

    Page<Product> findByActiveTrue(Pageable pageable);

    @Query(value = "{ active: true }", fields = "{ category: 1 }")
    List<Product> findAllActiveCategories();

}
