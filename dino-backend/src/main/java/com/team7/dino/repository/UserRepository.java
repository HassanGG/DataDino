package com.team7.dino.repository;

import com.team7.dino.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> getUserByEmailAndPassword(String email, String password);
    Optional<User> getUserByEmail(String email);
}
