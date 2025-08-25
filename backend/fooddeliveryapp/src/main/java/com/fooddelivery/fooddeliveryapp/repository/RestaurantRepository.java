package com.fooddelivery.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooddelivery.fooddeliveryapp.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{

}
