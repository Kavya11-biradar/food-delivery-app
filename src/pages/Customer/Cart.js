// src/pages/Customer/Cart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [addressId, setAddressId] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', zip: '' });
  const userId = localStorage.getItem('userId');

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    if (!userId) {
      console.warn('No userId found in localStorage.');
      return;
    }

    // Load addresses for user on mount
    if (userId) {
      axios.get(`http://localhost:8080/api/addresses/user/${userId}`)
        .then(res => setAddresses(res.data))
        .catch(err => console.error(err));
    }
  }, [userId]);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!addressId) {
      alert("Please select a delivery address.");
      return;
    }

    const orderPayload = {
      userId: parseInt(userId),
      addressId: parseInt(addressId),
      items: cart.map(item => ({
        foodItemId: item.id,
        quantity: item.quantity || 1
      }))
    };

    axios.post('http://localhost:8080/api/orders/place', orderPayload)
      .then(() => {
        alert("Order placed successfully!");
        localStorage.removeItem('cart');
        setCart([]);
        setAddressId('');
      })
      .catch(err => {
        console.error("Failed to place order:", err.response?.data || err.message);
        alert("Failed to place order.");
      });
  };

  const removeItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.zip) {
      alert("Please fill in all address fields.");
      return;
    }

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    axios.post(`http://localhost:8080/api/addresses/user/${userId}`, newAddress)
      .then(() => {
        alert("Address added successfully!");
        setNewAddress({ street: '', city: '', zip: '' });

        // Reload addresses after adding new one
        return axios.get(`http://localhost:8080/api/addresses/user/${userId}`);
      })
      .then(res => setAddresses(res.data))
      .catch(err => {
        console.error("Error adding address:", err.response?.data || err.message);
        alert("Failed to add address: " + (err.response?.data || err.message));
      });
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{item.name} - ${item.price} x {item.quantity || 1}</p>
              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))}

          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <div style={{ marginTop: '20px' }}>
            <label>
              Select Delivery Address:
              <br />
              <select
                value={addressId}
                onChange={e => setAddressId(e.target.value)}
                style={{ width: '300px', padding: '8px' }}
              >
                <option value="">-- Select an address --</option>
                {addresses.length === 0 ? (
                  <option disabled>You have no saved addresses.</option>
                ) : (
                  addresses.map(addr => (
                    <option key={addr.id} value={addr.id}>
                      {addr.street}, {addr.city} - {addr.zip}
                    </option>
                  ))
                )}
              </select>
            </label>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Add New Address</h3>
            <input
              type="text"
              placeholder="Street"
              value={newAddress.street}
              onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
              style={{ width: '300px', marginBottom: '10px', padding: '8px' }}
            /><br />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
              style={{ width: '300px', marginBottom: '10px', padding: '8px' }}
            /><br />
            <input
              type="text"
              placeholder="ZIP Code"
              value={newAddress.zip}
              onChange={e => setNewAddress({ ...newAddress, zip: e.target.value })}
              style={{ width: '300px', marginBottom: '10px', padding: '8px' }}
            /><br />
            <button onClick={handleAddAddress}>Add Address</button>
          </div>

          <br />
          <button onClick={handlePlaceOrder} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Place Order
          </button>
        </div>
      )}

    </div>
  );
};

export default Cart;
