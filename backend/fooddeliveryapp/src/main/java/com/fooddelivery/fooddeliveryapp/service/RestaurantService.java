package com.fooddelivery.fooddeliveryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fooddelivery.fooddeliveryapp.entity.Restaurant;
import com.fooddelivery.fooddeliveryapp.repository.RestaurantRepository;

@Service
public class RestaurantService {
	@Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

}
