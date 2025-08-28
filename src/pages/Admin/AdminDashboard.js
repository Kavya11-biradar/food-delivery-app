import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/AdminDashboard.css'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId');

  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    if (!adminId) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8080/api/users/admin/${adminId}`)
      .then(res => {
        setAdminName(res.data.name);
      })
      .catch(err => {
        console.error('Failed to fetch admin info', err);
      });
  }, [adminId, navigate]);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">👨‍💼 Admin Dashboard</h2>
      {adminName && <p className="welcome-text">Welcome, <strong>{adminName}</strong>!</p>}

      <ul className="admin-links-list">
        <li><Link to="/admin/add-restaurant" className="admin-link-btn">Add Restaurant</Link></li>
        <li><Link to="/admin/add-food" className="admin-link-btn">Add Food Item</Link></li>
        <li><Link to="/admin/orders" className="admin-link-btn">View All Orders</Link></li>
        <li><Link to={`/admin/profile/${adminId}`} className="admin-link-btn">Admin Profile</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
