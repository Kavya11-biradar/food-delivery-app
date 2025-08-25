package com.fooddelivery.fooddeliveryapp.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String email;
	private String password;

	private String role;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Address> addresses;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

//    @OneToOne(cascade = CascadeType.ALL)
//    private Address address;
//
//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private Cart cart;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Order> orders;

}
