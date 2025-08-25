package com.fooddelivery.fooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooddelivery.fooddeliveryapp.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

}
