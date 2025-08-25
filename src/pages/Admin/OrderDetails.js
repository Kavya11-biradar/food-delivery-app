// src/pages/Admin/OrderDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/orders/${id}`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch order:', err);
        setError('Failed to fetch order details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!order) return <p>No order data found.</p>;

  return (
    <div>
      <h2>Order {order.id} Details</h2>
      <p><strong>User:</strong> {order.user?.name || 'N/A'}</p>
      <p><strong>Address:</strong> {
        order.deliveryAddress
          ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.zip}`
          : 'N/A'
      }</p>
      <p><strong>Total Items:</strong> {order.orderItems?.length || 0}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice}</p>

      <h4>Items:</h4>
      <ul>
        {order.orderItems?.map((item, idx) => (
          <li key={idx}>
            {item.foodItem?.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
