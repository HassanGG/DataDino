package com.team7.dino.controller;

import com.team7.dino.entity.Dataset;
import com.team7.dino.entity.Order;
import com.team7.dino.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class OrderController {

    @Autowired
    private OrderRepository repository;

//    @RequestMapping(value = "/dino-backend/orders", method = GET)
//    @ResponseBody
//    private List<Order> getAllOrders(@RequestParam(value="customerId") Optional<String> userId) {
//        if (userId.isPresent()) {
//            return repository.findAllByUserId_UserId(UUID.fromString(userId.get()));
//        }
//        return repository.findAll();
//    }

    @RequestMapping(value = "/dino-backend/orders", method = GET)
    @ResponseBody
    private List<Order> getAllOrders() {
//        System.out.println(repository.findAll());
        return repository.findAll();
    }

    @RequestMapping(value="/dino-backend/orders/{id}", method=GET)
    @ResponseBody
    private Optional<Order> getOrdersById(@PathVariable String id) {
        return repository.findById(UUID.fromString(id));
    }

    // TODO: error checking
    @PostMapping("/dino-backend/orders")
    @ResponseBody
    private void saveOrder(@RequestBody Order order) {
        repository.save(order);
    }

    @PatchMapping("/dino-backend/orders")
    @ResponseBody
    private void patchOrder(@RequestBody Order order, @RequestBody String state ) {
        if(repository.existsById(order.getOrderId())) {
            repository.deleteById(order.getOrderId());
        }
        repository.save(order);
    }
}
