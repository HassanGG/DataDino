package com.team7.dino.repository;

import com.team7.dino.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    public List<User> findAllByUserId(UUID userId);
}
