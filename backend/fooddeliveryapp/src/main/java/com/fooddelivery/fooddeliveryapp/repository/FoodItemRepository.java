package com.fooddelivery.fooddeliveryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooddelivery.fooddeliveryapp.entity.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long>{

	List<FoodItem> findByRestaurantId(Long restaurantId);
}
