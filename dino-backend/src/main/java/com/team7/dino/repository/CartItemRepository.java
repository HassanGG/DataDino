package com.team7.dino.repository;

import com.team7.dino.entity.CartItem;
import com.team7.dino.entity.Dataset;
import com.team7.dino.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {
    public List<CartItem> findAllByUserId(User userId);
    public List<CartItem> findAllByDatasetId(Dataset datasetId);

}
