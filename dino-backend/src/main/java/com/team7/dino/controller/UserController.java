package com.team7.dino.controller;

import com.team7.dino.entity.User;
import com.team7.dino.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class UserController {

    @Autowired
    private UserRepository repository;


    @RequestMapping(value="/dino-backend/users{id}", method=GET)
    @ResponseBody
    private Optional<User> getUserById(@PathVariable String id) {
        id = id.substring(1, id.length() - 1);
        return repository.findById(UUID.fromString(id));
    }

}
