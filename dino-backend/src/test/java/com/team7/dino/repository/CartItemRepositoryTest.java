package com.team7.dino.repository;

import com.team7.dino.entity.CartItem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class CartItemRepositoryTest {

    @Autowired
    private CartItemRepository repository;

    @Test
    public void printAllDatasets() {
        List<CartItem> datasets = repository.findAll();

        System.out.println("datasets = " + datasets);
    }
}
