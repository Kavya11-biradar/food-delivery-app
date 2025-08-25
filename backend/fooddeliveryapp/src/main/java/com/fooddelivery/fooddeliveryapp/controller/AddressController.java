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

import com.fooddelivery.fooddeliveryapp.entity.Address;
import com.fooddelivery.fooddeliveryapp.service.AddressService;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/addresses")
public class AddressController {
	@Autowired
	private AddressService addressService;

	// 1. Add address
	@PostMapping("/user/{userId}")
	public ResponseEntity<Address> addAddress(@PathVariable Long userId, @RequestBody Address address) {

		Address newAddress = addressService.addAddress(userId, address);
		return ResponseEntity.ok(newAddress);
	}

	// 2. Get all addresses of user
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Address>> getAddresses(@PathVariable Long userId) {

		List<Address> addresses = addressService.getAddressesByUser(userId);
		return ResponseEntity.ok(addresses);
	}

}
