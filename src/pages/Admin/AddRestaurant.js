import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AddRestaurant.css'; // Import CSS (adjust path if needed)

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleAddRestaurant = () => {
    if (!name || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const restaurant = { name, address };

    axios.post('http://localhost:8080/api/admin/restaurants', restaurant)
      .then((response) => {
        alert(response.data);
        setName('');
        setAddress('');
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add restaurant.");
      });
  };

  return (
    <div className="add-restaurant-container">
      <h2 className="form-title">Add Restaurant</h2>

      <label htmlFor="restaurantName" className="form-label">Restaurant Name</label>
      <input
        id="restaurantName"
        type="text"
        placeholder="Enter restaurant name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
      />

      <label htmlFor="restaurantAddress" className="form-label">Address</label>
      <input
        id="restaurantAddress"
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="form-input"
      />

      <button onClick={handleAddRestaurant} className="submit-btn">Add Restaurant</button>
    </div>
  );
};

export default AddRestaurant;
