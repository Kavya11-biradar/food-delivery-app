import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders/admin/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>All Customer Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No orders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map(order => (
            <li
              key={order.id}
              style={{
                marginBottom: '15px',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#f7f9fc',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>Order ID:</strong> {order.id}
              </div>
              <button
                onClick={() => navigate(`/admin/order/${order.id}`)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2980b9',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1c5980'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2980b9'}
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

export default ViewOrders;
