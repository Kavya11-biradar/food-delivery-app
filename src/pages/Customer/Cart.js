import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [addressId, setAddressId] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', zip: '' });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    if (!userId) {
      console.warn('No userId found in localStorage.');
      return;
    }

    axios.get(`http://localhost:8080/api/addresses/user/${userId}`)
      .then(res => setAddresses(res.data))
      .catch(err => console.error(err));
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
    <div className="container">
      <h2 className="heading">Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">${item.price.toFixed(2)} x {item.quantity || 1}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="total">Total: ${totalPrice.toFixed(2)}</h3>

          <div className="address-section">
            <label htmlFor="address-select" className="label">
              Select Delivery Address:
            </label>
            <select
              id="address-select"
              value={addressId}
              onChange={e => setAddressId(e.target.value)}
              className="select"
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
          </div>

          <div className="new-address-section">
            <h3>Add New Address</h3>
            <input
              type="text"
              placeholder="Street"
              value={newAddress.street}
              onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
              className="input"
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
              className="input"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={newAddress.zip}
              onChange={e => setNewAddress({ ...newAddress, zip: e.target.value })}
              className="input"
            />
            <button onClick={handleAddAddress} className="add-address-btn">Add Address</button>
          </div>

          <button onClick={handlePlaceOrder} className="place-order-btn">
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
