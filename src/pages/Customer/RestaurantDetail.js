import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/RestaurantDetail.css'; 

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
    <div className="restaurant-detail-container">
      <h2 className="page-title">🍽️ Food Menu</h2>

      {foods.length === 0 ? (
        <p className="empty-message">No food items available for this restaurant.</p>
      ) : (
        <div className="food-list">
          {foods.map(food => (
            <div key={food.id} className="food-card">
              <div className="food-info">
                <h3 className="food-name">{food.name}</h3>
                <p className="food-price">${food.price.toFixed(2)}</p>
              </div>
              <button className="add-cart-btn" onClick={() => addToCart(food)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
