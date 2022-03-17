package com.team7.dino.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.team7.dino.entity.Order;
import com.team7.dino.entity.OrderItem;
import com.team7.dino.repository.OrderItemRepository;
import com.team7.dino.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@CrossOrigin
@RequestMapping("/dino-backend/orders")
@Controller
public class OrderController {

    private final BiFunction<JsonNode, String, String> removeQuotes = (jsonObj, str) -> jsonObj
            .get(str)
            .toString()
            .replace("\"", "");
    @Autowired
    private OrderRepository repository;
    @Autowired
    private OrderItemRepository itemRepo;

    @RequestMapping(value = "", method = GET)
    @ResponseBody
    private ResponseEntity<List<Order>> getAllOrders(@RequestParam Optional<String> userId) {
        if (userId.isEmpty()) {
            return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        }

        List<Order> orders = repository.findOrderByUserId(userId.get());
        if (orders == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = GET)
    @ResponseBody
    private ResponseEntity<Order> getOrdersById(@PathVariable String id) {
        Optional<Order> order = repository.findById(UUID.fromString(id));

        if (order.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(order.get(), HttpStatus.OK);
    }

    @PostMapping("")
    @ResponseBody
    private ResponseEntity<String> saveOrder(@RequestBody JsonNode json) {
        UUID orderId = UUID.randomUUID();
        json.get("items").forEach(jsonItem -> {
            OrderItem orderItem = OrderItem
                    .builder()
                    .orderId(orderId.toString())
                    .datasetId(removeQuotes.apply(jsonItem, "datasetId"))
                    .datapointCount(jsonItem.get("datapointCount").asInt())
                    .build();

            itemRepo.save(orderItem);
        });

        Order order = Order
                .builder()
                .id(orderId)
                // TODO: issue here; purchasedAt being stored as negative number?
                .purchasedAt(json.get("purchasedAt").asLong())
                .total(json.get("total").asDouble())
                .state("New")
                .userId(removeQuotes.apply(json, "userId"))
                .build();

        repository.save(order);
        return new ResponseEntity<>(orderId.toString(), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    private ResponseEntity<String> patchOrder(@RequestBody JsonNode json, @PathVariable String id) {

        if (!json.hasNonNull("state")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String state = removeQuotes.apply(json, "state");

        if (!state.equals("Cancelled") && !state.equals("Delivered")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Order order = repository.getById(UUID.fromString(id));
        order.setState(state);
        repository.save(order);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
