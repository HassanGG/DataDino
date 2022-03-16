package com.team7.dino;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DinoApplication {

    public static void main(String[] args) {
        System.out.println("recreated");
        SpringApplication.run(DinoApplication.class, args);
    }

}
