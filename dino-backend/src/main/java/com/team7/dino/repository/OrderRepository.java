package com.team7.dino.repository;

import com.team7.dino.entity.Order;
import com.team7.dino.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    public List<Order> findAllByOrderId(UUID orderId);
//    public List<Order> findAllByUserId(User userId);
//    public List<Order> findAllByUserId(User userId);
//    public List<Order> findAllByUserId_UserId(UUID userId);
}
