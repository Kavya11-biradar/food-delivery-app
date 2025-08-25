// src/pages/Customer/RestaurantDetail.js

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/food/restaurant/${id}`)
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(food);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Item added to cart!");
  };

  return (
    <div>
      <h2>Food Menu</h2>
      {foods.length === 0 ? (
        <p>No food items available for this restaurant.</p>
      ) : (
        foods.map(food => (
          <div key={food.id} style={{ marginBottom: '10px' }}>
            <p>{food.name} - ${food.price}</p>
            <button onClick={() => addToCart(food)}>Add to Cart</button>
          </div>

        ))
      )}
    </div>
  );
};

export default RestaurantDetail;
