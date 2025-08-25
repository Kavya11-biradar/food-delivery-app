package com.fooddelivery.fooddeliveryapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fooddelivery.fooddeliveryapp.entity.Address;
import com.fooddelivery.fooddeliveryapp.entity.FoodItem;
import com.fooddelivery.fooddeliveryapp.entity.Order;
import com.fooddelivery.fooddeliveryapp.entity.OrderItem;
import com.fooddelivery.fooddeliveryapp.entity.User;
import com.fooddelivery.fooddeliveryapp.repository.AddressRepository;
import com.fooddelivery.fooddeliveryapp.repository.FoodItemRepository;
import com.fooddelivery.fooddeliveryapp.repository.OrderRepository;
import com.fooddelivery.fooddeliveryapp.repository.UserRepository;

@Service
public class OrderService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private FoodItemRepository foodItemRepository;

	@Autowired
	private OrderRepository orderRepository;

	public Order placeOrder(Long userId, Long addressId, Map<Long, Integer> foodItemQuantities) {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		Address address = addressRepository.findById(addressId)
				.orElseThrow(() -> new RuntimeException("Address not found"));

		Order order = new Order();
		order.setUser(user);
		order.setDeliveryAddress(address);
		order.setOrderTime(LocalDateTime.now());

		order.setStatus("PLACED");
		List<OrderItem> orderItems = new ArrayList<>();
		double totalPrice = 0.0;

		for (Map.Entry<Long, Integer> entry : foodItemQuantities.entrySet()) {
			Long foodItemId = entry.getKey();
			int quantity = entry.getValue();

			FoodItem foodItem = foodItemRepository.findById(foodItemId)
					.orElseThrow(() -> new RuntimeException("Food item not found"));

			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(order);
			orderItem.setFoodItem(foodItem);
			orderItem.setQuantity(quantity);
			orderItem.setPrice(foodItem.getPrice() * quantity); // ✅ Set price here

			orderItems.add(orderItem);
			totalPrice += orderItem.getPrice();
		}

		order.setOrderItems(orderItems);
		order.setTotalPrice(totalPrice);

		// Save order (will also save items if cascade is set)
		return orderRepository.save(order);
	}

	public List<Order> getOrdersByUser(Long userId) {
		return orderRepository.findByUserId(userId);
	}

	public Order getOrderById(Long orderId) {
		return orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
	}

	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

}
