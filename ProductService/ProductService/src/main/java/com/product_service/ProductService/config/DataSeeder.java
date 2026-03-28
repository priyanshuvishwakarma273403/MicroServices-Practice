package com.product_service.ProductService.config;

import com.product_service.ProductService.model.Product;
import com.product_service.ProductService.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final ProductRepository productRepo;


    @Bean
    @Profile("dev")
    public CommandLineRunner seedProducts() {
        return args -> {
            if (productRepo.count() > 0) {
                log.info("Products already seeded, skipping.");
                return;
            }

            List<Product> products = List.of(
                    Product.builder()
                            .name("iPhone 15 Pro")
                            .description("Apple iPhone 15 Pro with A17 Pro chip, 48MP camera, titanium design")
                            .price(134900.0)
                            .stock(50)
                            .category("smartphones")
                            .brand("Apple")
                            .imageUrls(List.of("https://example.com/iphone15pro.jpg"))
                            .rating(4.8)
                            .reviewCount(0)
                            .build(),

                    Product.builder()
                            .name("Samsung Galaxy S24 Ultra")
                            .description("Samsung flagship with S-Pen, 200MP camera, 5000mAh battery")
                            .price(124999.0)
                            .stock(35)
                            .category("smartphones")
                            .brand("Samsung")
                            .imageUrls(List.of("https://example.com/s24ultra.jpg"))
                            .rating(4.7)
                            .reviewCount(0)
                            .build(),

                    Product.builder()
                            .name("Sony WH-1000XM5")
                            .description("Industry-leading noise cancelling wireless headphones")
                            .price(24990.0)
                            .stock(100)
                            .category("audio")
                            .brand("Sony")
                            .imageUrls(List.of("https://example.com/wh1000xm5.jpg"))
                            .rating(4.9)
                            .reviewCount(0)
                            .build(),

                    Product.builder()
                            .name("MacBook Pro 14 M3")
                            .description("Apple MacBook Pro with M3 chip, 16GB RAM, 512GB SSD")
                            .price(199900.0)
                            .stock(20)
                            .category("laptops")
                            .brand("Apple")
                            .imageUrls(List.of("https://example.com/macbookpro14.jpg"))
                            .rating(4.9)
                            .reviewCount(0)
                            .build(),

                    Product.builder()
                            .name("boAt Airdopes 141")
                            .description("True Wireless earbuds with 42H total playback, IPX4")
                            .price(1299.0)
                            .stock(500)
                            .category("audio")
                            .brand("boAt")
                            .imageUrls(List.of("https://example.com/airdopes141.jpg"))
                            .rating(4.1)
                            .reviewCount(0)
                            .build(),

                    Product.builder()
                            .name("Mi Smart Band 8")
                            .description("Xiaomi fitness tracker with AMOLED display, SpO2, 16 day battery")
                            .price(2999.0)
                            .stock(200)
                            .category("wearables")
                            .brand("Xiaomi")
                            .imageUrls(List.of("https://example.com/miband8.jpg"))
                            .rating(4.3)
                            .reviewCount(0)
                            .build()
            );

            productRepo.saveAll(products);
            log.info("Seeded {} products successfully.", products.size());
        };
    }
}
