// src/pages/Customer/CustomerHome.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {

    if (!userId) {
      navigate('/login');
      return;
    }
    axios.get('http://localhost:8080/api/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, [userId, navigate]);


  return (
    <div>
      <h2>All Restaurants</h2>
      {restaurants.map(r => (
        <div key={r.id} style={{ margin: '10px 0' }}>
          <h3>{r.name}</h3>
          <p>{r.description}</p>
          <Link to={`/restaurant/${r.id}`}>View Menu</Link>
        </div>
      ))} <br></br>
      <div style={{ marginBottom: '20px' }}>

        <Link to="/cart">🛒 Go to Cart</Link> <br></br> <br></br>
        <Link to={`/customer/profile/${userId}`}>Customer Profile</Link>


        <span style={{ marginLeft: '20px' }}></span>

      </div>

    </div>
  );


};

export default CustomerHome;
