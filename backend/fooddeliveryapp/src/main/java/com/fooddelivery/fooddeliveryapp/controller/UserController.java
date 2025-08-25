package com.fooddelivery.fooddeliveryapp.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.fooddelivery.fooddeliveryapp.dto.LoginRequestDto;
import com.fooddelivery.fooddeliveryapp.entity.User;
import com.fooddelivery.fooddeliveryapp.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User createdUser = userService.createUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id) {
		return userService.getUserById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

//	@GetMapping("/customer/{id}")
//	public ResponseEntity<User> getCustomerProfile(@PathVariable Long id) {
//	    Optional<User> userOpt = userService.getUserById(id);
//	    if (userOpt.isPresent() && "CUSTOMER".equalsIgnoreCase(userOpt.get().getRole())) {
//	        return ResponseEntity.ok(userOpt.get());
//	    }
//	    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//	}
//	
	@GetMapping("/admin/{id}")
	public ResponseEntity<User> getAdminProfile(@PathVariable Long id) {
		Optional<User> userOpt = userService.getUserById(id);
		if (userOpt.isPresent() && "ADMIN".equalsIgnoreCase(userOpt.get().getRole())) {
			return ResponseEntity.ok(userOpt.get());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) {
		Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());

		if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginRequest.getPassword())) {
			User user = userOpt.get();
			user.setPassword(null); 
			return ResponseEntity.ok(user);
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	}

}
