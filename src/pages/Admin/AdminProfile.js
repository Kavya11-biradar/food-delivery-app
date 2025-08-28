import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/AdminProfile.css'; // Import CSS (adjust path if needed)

const AdminProfile = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();

  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/admin/${adminId}`)
      .then(res => setAdmin(res.data))
      .catch(err => {
        console.error(err);
        setError('Admin not found.');
      });

    axios.get('http://localhost:8080/api/orders/admin/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [adminId]);

  if (error) return <p className="error-msg">{error}</p>;
  if (!admin) return <p className="loading-msg">Loading admin profile...</p>;

  return (
    <div className="admin-profile-container">
      <h2 className="profile-title">👨‍💼 Admin Profile</h2>

      <div className="admin-info-card">
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
      </div>

      <h3 className="orders-title">📦 All User Orders</h3>

      {orders.length === 0 ? (
        <p className="no-orders-msg">No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <span>Order ID: <strong>{order.id}</strong></span>
              <button
                className="view-details-btn"
                onClick={() => navigate(`/admin/order/${order.id}`)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProfile;
