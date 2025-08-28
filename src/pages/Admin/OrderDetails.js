import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams();
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

  if (loading) return <p style={{ textAlign: 'center' }}>Loading order details...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!order) return <p style={{ textAlign: 'center' }}>No order data found.</p>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Order #{order.id} Details</h2>

      <p><strong>User:</strong> {order.user?.name || 'N/A'}</p>
      <p><strong>Address:</strong> {
        order.deliveryAddress
          ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.zip}`
          : 'N/A'
      }</p>
      <p><strong>Total Items:</strong> {order.orderItems?.length || 0}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>

      <h4 style={{ marginTop: '30px', marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
        Items:
      </h4>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {order.orderItems?.map((item, idx) => (
          <li key={idx} style={{
            padding: '8px 0',
            borderBottom: idx !== order.orderItems.length - 1 ? '1px solid #eee' : 'none'
          }}>
            {item.foodItem?.name} - ${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
