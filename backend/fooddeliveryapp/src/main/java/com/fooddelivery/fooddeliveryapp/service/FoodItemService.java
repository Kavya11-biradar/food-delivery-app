package com.fooddelivery.fooddeliveryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fooddelivery.fooddeliveryapp.entity.FoodItem;
import com.fooddelivery.fooddeliveryapp.entity.Restaurant;
import com.fooddelivery.fooddeliveryapp.repository.FoodItemRepository;
import com.fooddelivery.fooddeliveryapp.repository.RestaurantRepository;

@Service
public class FoodItemService {
	@Autowired
	private FoodItemRepository foodItemRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	// Add food item to restaurant
	public FoodItem addFoodItem(Long restaurantId, FoodItem foodItem) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new RuntimeException("Restaurant not found"));

		foodItem.setRestaurant(restaurant);
		return foodItemRepository.save(foodItem);
	}

	// Get food items by restaurant ID
	public List<FoodItem> getFoodItemsByRestaurant(Long restaurantId) {
		return foodItemRepository.findByRestaurantId(restaurantId);
	}

}
