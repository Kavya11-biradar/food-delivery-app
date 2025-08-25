import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFood = () => {
  // State for restaurant list
  const [restaurants, setRestaurants] = useState([]);

  // Form input states
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');

  // Fetch restaurant list
  useEffect(() => {
    axios.get('http://localhost:8080/api/restaurants')
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  const handleAddFood = () => {
    if (!selectedRestaurantId || !foodName || !price) {
      alert("Please fill all fields");
      return;
    }

    axios.post(`http://localhost:8080/api/food/restaurant/${selectedRestaurantId}`, {
      name: foodName,
      price: price
    })
      .then(response => {
        alert("Food item added successfully");
        setFoodName('');
        setPrice('');
        setSelectedRestaurantId('');
      })
      .catch(error => {
        console.error("Error adding food item:", error);
        alert("Failed to add food item");
      });
  };

  return (
    <div>
      <h2>Add Food Item</h2>

      <select value={selectedRestaurantId} onChange={(e) => setSelectedRestaurantId(e.target.value)}>
        <option value="">Select Restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="text"
        placeholder="Food Name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAddFood}>Add Food Item</button>
    </div>
  );
};

export default AddFood;
