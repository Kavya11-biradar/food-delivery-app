package com.fooddelivery.fooddeliveryapp.entity;

import java.util.List;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Restaurant {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long id;
    private String name;
    private String address;
    
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<FoodItem> foodItems;
    
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
    
    

}
