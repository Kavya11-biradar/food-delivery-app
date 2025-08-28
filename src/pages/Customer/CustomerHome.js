import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/CustomerHome.css';


const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:8080/api/restaurants')
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, [userId, navigate]);

  return (
    <div className="customer-home-container">
      <h2 className="page-title">🍽️ Find Your Favorite Restaurant</h2>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant.id}>
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <p className="restaurant-description">{restaurant.description}</p>
            <Link to={`/restaurant/${restaurant.id}`} className="view-menu-button">
              View Menu 🍴
            </Link>
          </div>
        ))}
      </div>

      <div className="buttons-container">
        <Link to="/cart" className="secondary-button">
          🛒 Go to Cart
        </Link>
        <Link to={`/customer/profile/${userId}`} className="secondary-button">
          👤 Customer Profile
        </Link>
      </div>
    </div>
  );
};

export default CustomerHome;
