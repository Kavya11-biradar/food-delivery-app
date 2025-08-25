// src/pages/HomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-background">
      <div className="homepage-overlay">
        <div className="container text-center mt-5">
          <h1 className="main-title mb-3">🍕 Food Delivery App</h1>
          <h2 className="welcome-text mb-4">Welcome to Food Delivery App</h2>
          <p className="lead mb-5">Please select your role to continue:</p>

          <div className="d-flex justify-content-center gap-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/login?role=customer')}
            >
              👨‍🍳 Customer
            </button> <br></br>  <br></br>

            <button
              className="btn btn-success btn-lg"
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
