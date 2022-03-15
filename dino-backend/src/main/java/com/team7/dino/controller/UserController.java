package com.team7.dino.controller;

import com.team7.dino.entity.Dataset;
import com.team7.dino.entity.Order;
import com.team7.dino.entity.User;
import com.team7.dino.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class UserController {


    // TODO: do login get request
    @Autowired
    private UserRepository repository;

//    @RequestMapping(value="/dino-backend/users/login", method=GET)
//    @ResponseBody
//    private boolean login(@PathVariable String id) {
//        return repository.findById(UUID.fromString(id));

    @RequestMapping(value="/dino-backend/users/{id}", method=GET)
    @ResponseBody
    private Optional<User> getUserById(@PathVariable String id) {
        return repository.findById(UUID.fromString(id));
    }

    // TODO: error checking
    @PostMapping("/dino-backend/users")
    @ResponseBody
    private void saveUser(@RequestBody User user) {
        repository.save(user);
    }


    @RequestMapping(value = "/dino-backend/users", method = GET)
    @ResponseBody
    private List<User> getAllUsers() {
//        System.out.println(repository.findAll());
        return repository.findAll();
    }
}
