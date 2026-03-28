package com.order_service.OrderService.repository;

import com.order_service.OrderService.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    List<Order> findByStatus(Order.OrderStatus status);

    Optional<Order> findByIdAndUserId(Long id, Long userId);

    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :from AND :to ORDER BY o.createdAt DESC")
    List<Order> findOrdersByDateRange(LocalDateTime from, LocalDateTime to);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'DELIVERED'")
    Double getTotalRevenue();

}
