package com.team7.dino.repository;

import com.team7.dino.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {
    public List<OrderItem> findAllByOrderId(Order orderId);
    public List<OrderItem> findAllByDatasetId(Dataset datasetId);


}
