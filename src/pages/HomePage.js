import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import logo from '../assets/logo.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-background">
      <div className="homepage-overlay">
        <div className="container text-center mt-5">

          <img src={logo} alt="App Logo" className="app-logo" />

          <h1 className="main-title mb-3">🍕 Food Delivery App</h1>
          <h2 className="welcome-text mb-4">Welcome to Food Delivery App</h2>
          <p className="lead mb-5">Select your user type to continue:</p>

          <div className="role-buttons">
  <button
    className="role-button customer-button"
    onClick={() => navigate('/login?role=customer')}
  >
    👨‍🍳 Customer
  </button>

  <button
    className="role-button admin-button"
    onClick={() => navigate('/login?role=admin')}
  >
    👨‍💼 Admin
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
