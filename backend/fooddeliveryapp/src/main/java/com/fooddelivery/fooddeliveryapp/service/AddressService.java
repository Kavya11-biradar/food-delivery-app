package com.fooddelivery.fooddeliveryapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fooddelivery.fooddeliveryapp.entity.Address;
import com.fooddelivery.fooddeliveryapp.entity.User;
import com.fooddelivery.fooddeliveryapp.repository.AddressRepository;
import com.fooddelivery.fooddeliveryapp.repository.UserRepository;

@Service
public class AddressService {
	@Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public Address addAddress(Long userId, Address address) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        address.setUser(user);
        return addressRepository.save(address);
    }

    public List<Address> getAddressesByUser(Long userId) {
        return addressRepository.findByUserId(userId);
    }

}
