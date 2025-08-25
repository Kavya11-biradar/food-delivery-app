package com.fooddelivery.fooddeliveryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fooddelivery.fooddeliveryapp.entity.Order;
import com.fooddelivery.fooddeliveryapp.entity.Restaurant;
import com.fooddelivery.fooddeliveryapp.repository.OrderRepository;
import com.fooddelivery.fooddeliveryapp.service.RestaurantService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired
    private RestaurantService restaurantService;

	@PostMapping("/restaurants")
    public ResponseEntity<String> addRestaurant(@RequestBody Restaurant restaurant) {
        if (restaurant.getName() == null || restaurant.getAddress() == null) {
            return ResponseEntity.badRequest().body("Name and address are required");
        }

        restaurantService.addRestaurant(restaurant);
        return ResponseEntity.ok("Restaurant added successfully");
    }

}
