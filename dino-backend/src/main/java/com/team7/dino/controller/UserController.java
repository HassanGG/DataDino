package com.team7.dino.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.team7.dino.entity.User;
import com.team7.dino.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@CrossOrigin
@RequestMapping("/dino-backend/users")
@Controller
public class UserController {

    private final BiFunction<JsonNode, String, String> removeQuotes = (jsonObj, str) -> jsonObj
            .get(str)
            .toString()
            .replace("\"", "");
    @Autowired
    private UserRepository repository;

    @RequestMapping(value = "/{id}", method = GET)
    @ResponseBody
    private ResponseEntity<User> getUserById(@PathVariable String id) {
        if (!repository.existsById(UUID.fromString(id))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = repository.getById(UUID.fromString(id));
        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @PostMapping("")
    @ResponseBody
    private ResponseEntity<String> saveUser(@RequestBody JsonNode json) {
        if (!json.hasNonNull("email") || !json.hasNonNull("password")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = User
                .builder()
                .id(UUID.randomUUID())
                .email(removeQuotes.apply(json, "email"))
                .password(removeQuotes.apply(json, "password"))
                .isAdmin(false)
                .build();

        if (json.hasNonNull("displayName")) {
            user.setDisplayName(removeQuotes.apply(json, "displayName"));
        }

        repository.save(user);

        return new ResponseEntity<>(user.getId().toString(), HttpStatus.OK);
    }

    @GetMapping(value = "/login")
    @ResponseBody
    private ResponseEntity<User> login(@RequestParam(name = "email") String email,
            @RequestParam(name = "password") String password) {
        Optional<User> user = repository.getUserByEmailAndPassword(email, password);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }
}
