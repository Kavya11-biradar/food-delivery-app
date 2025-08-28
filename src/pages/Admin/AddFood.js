import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/AddFood.css'; 

const AddFood = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/restaurants')
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error fetching restaurants:", error));
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
      .then(() => {
        alert("Food item added successfully");
        setFoodName('');
        setPrice('');
        setSelectedRestaurantId('');
      })
      .catch(() => alert("Failed to add food item"));
  };

  return (
    <div className="add-food-container">
      <h2 className="form-title">Add Food Item</h2>

      <label htmlFor="restaurantSelect" className="form-label">Select Restaurant</label>
      <select
        id="restaurantSelect"
        value={selectedRestaurantId}
        onChange={(e) => setSelectedRestaurantId(e.target.value)}
        className="form-select"
      >
        <option value="">-- Select Restaurant --</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>

      <label htmlFor="foodName" className="form-label">Food Name</label>
      <input
        id="foodName"
        type="text"
        placeholder="Enter food name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        className="form-input"
      />

      <label htmlFor="price" className="form-label">Price ($)</label>
      <input
        id="price"
        type="number"
        min="0"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="form-input"
      />

      <button onClick={handleAddFood} className="submit-btn">Add Food Item</button>
    </div>
  );
};

export default AddFood;
