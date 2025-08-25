package com.fooddelivery.fooddeliveryapp.controller;

import java.util.HashMap;
//import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fooddelivery.fooddeliveryapp.entity.Address;
import com.fooddelivery.fooddeliveryapp.entity.FoodItem;
import com.fooddelivery.fooddeliveryapp.entity.Order;
import com.fooddelivery.fooddeliveryapp.entity.OrderItem;
import com.fooddelivery.fooddeliveryapp.repository.FoodItemRepository;
import com.fooddelivery.fooddeliveryapp.repository.OrderItemRepository;
import com.fooddelivery.fooddeliveryapp.repository.OrderRepository;
import com.fooddelivery.fooddeliveryapp.service.OrderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired
	private OrderService orderService;

//	 1. Place order
//	@PostMapping("/place")
//	public ResponseEntity<Order> placeOrder(@RequestParam Long userId, @RequestParam Long addressId,
//			@RequestBody Map<Long, Integer> foodItemQuantities // foodItemId -> quantity
//	) {
//		Order newOrder = orderService.placeOrder(userId, addressId, foodItemQuantities);
//		return ResponseEntity.ok(newOrder);
// }

	@PostMapping("/place")
	public ResponseEntity<Order> placeOrder(@RequestBody Map<String, Object> requestBody) {
		Long userId = Long.valueOf(requestBody.get("userId").toString());
		Long addressId = Long.valueOf(requestBody.get("addressId").toString());

		List<Map<String, Object>> items = (List<Map<String, Object>>) requestBody.get("items");

		Map<Long, Integer> foodItemQuantities = new HashMap<>();

		for (Map<String, Object> item : items) {
			Long foodItemId = Long.valueOf(item.get("foodItemId").toString());
			Integer quantity = Integer.parseInt(item.get("quantity").toString());
			foodItemQuantities.put(foodItemId, quantity);
		}

		Order newOrder = orderService.placeOrder(userId, addressId, foodItemQuantities);
		return ResponseEntity.ok(newOrder);
	}

	// 2. View all orders by user
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
		List<Order> orders = orderService.getOrdersByUser(userId);
		return ResponseEntity.ok(orders);
	}

	// 3. View order details
	@GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderDetails(@PathVariable Long orderId) {
		Order order = orderService.getOrderById(orderId);
		return ResponseEntity.ok(order);
	}

	// 4. Admin: View all orders
	@GetMapping("/admin/all")
	public ResponseEntity<List<Order>> getAllOrders() {
		return ResponseEntity.ok(orderService.getAllOrders());
	}

}
