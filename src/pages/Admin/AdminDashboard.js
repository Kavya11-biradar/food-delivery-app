// src/pages/Admin/AdminDashboard.js


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId'); // assuming you store userId on login

  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    if (!adminId) {
      // No adminId found, redirect to login
      navigate('/login');
      return;
    }

    // Fetch admin details to show admin name
    axios.get(`http://localhost:8080/api/users/admin/${adminId}`)
      .then(res => {
        setAdminName(res.data.name);
      })
      .catch(err => {
        console.error('Failed to fetch admin info', err);
        // Optional: logout or redirect to login if error
      });
  }, [adminId, navigate]);

  return (
    <div>
      <h2> 👨‍💼 Admin Dashboard</h2>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><Link to="/admin/add-restaurant">Add Restaurant</Link></li> <br /><br />
        <li><Link to="/admin/add-food">Add Food Item</Link></li> <br /><br />
        <li><Link to="/admin/orders">View All Orders</Link></li> <br /><br />
        {/* <li><Link to="`/admin/profile/${adminId}`">Admin Profile</Link></li> */}
        <li><Link to={`/admin/profile/${adminId}`}>Admin Profile</Link></li>

      </ul>
    </div>
  );
};

export default AdminDashboard;
