package com.team7.dino.repository;

import com.team7.dino.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@SpringBootTest
public class UserRepositoryTest {
    @Autowired
    UserRepository repository;

    private String s = UUID.randomUUID().toString();

    @Test
    public void saveUser() {
        User user = User
                .builder()
                .displayName("J")
                .email("email" + String.valueOf(Math.random()))
                .isAdmin(false)
                .build();

        repository.save(user);
    }

    @Test
    public void printAllUsers() {
        List<User> users = repository.findAll();

        System.out.println(users);
    }

    @Test
    public void getUser() {
        Optional<User> user = repository.findById(UUID.randomUUID());
        if (user.isPresent()) System.out.println("user = " + user);
        else System.out.println("nothing");
    }
}
