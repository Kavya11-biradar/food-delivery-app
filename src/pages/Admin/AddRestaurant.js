// src/pages/Admin/AddRestaurant.js

import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Add Restaurant</h2>
      <input
        type="text"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button onClick={handleAddRestaurant}>Add Restaurant</button>
    </div>
  );
};

export default AddRestaurant;
