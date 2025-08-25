// src/pages/Login.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  //const location = useLocation();
  const navigate = useNavigate();

  //const params = new URLSearchParams(location.search);
  //const role = params.get('role'); // "admin" or "customer"


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      const user = response.data;

      // Save user ID to localStorage
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);

      // Navigate to respective profile
      if (user.role && user.role.toLowerCase() === 'admin') {
        localStorage.setItem('adminId', user.id);
        navigate('/admin');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login </h2>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
