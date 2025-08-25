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

import com.fooddelivery.fooddeliveryapp.entity.FoodItem;
import com.fooddelivery.fooddeliveryapp.service.FoodItemService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/food")
public class FoodItemController {

	@Autowired
	private FoodItemService foodItemService;

	// 1. Add a food item (Admin)
	@PostMapping("/restaurant/{restaurantId}")
	public ResponseEntity<FoodItem> addFoodItem(@PathVariable Long restaurantId, @RequestBody FoodItem foodItem) {

		FoodItem createdItem = foodItemService.addFoodItem(restaurantId, foodItem);
		return ResponseEntity.ok(createdItem);
	}

	// 2. Get food items by restaurant (Customer/Admin)
	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<List<FoodItem>> getFoodItemsByRestaurant(@PathVariable Long restaurantId) {

		List<FoodItem> items = foodItemService.getFoodItemsByRestaurant(restaurantId);
		return ResponseEntity.ok(items);
	}

}
