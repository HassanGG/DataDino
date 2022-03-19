package com.team7.dino;

import com.team7.dino.entity.User;
import com.team7.dino.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CreateAdmin {

    @Autowired
    private UserRepository repo;

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        if (repo.getUserByEmail("admin@admin.com").isEmpty()) {
            User admin = User.builder()
                    .id(UUID.randomUUID())
                    .isAdmin(true)
                    .email("admin@admin.com")
                    .password("admin")
                    .displayName("Admin")
                    .build();
            repo.save(admin);
        }
    }

}
