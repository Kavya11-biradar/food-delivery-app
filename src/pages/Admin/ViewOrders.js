// src/pages/Admin/ViewOrders.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  //const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders/admin/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  

  return (
    <div>
      <h2>All Customer Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} style={{ marginBottom: '10px' }}>
              <strong>Order ID:</strong> {order.id} 
              {/* - <strong>User ID:</strong> {order.userId} */}
              <br />
              {/* <button onClick={() => fetchOrderDetails(order.id)}>View Details</button> */}
              <button onClick={() => navigate(`/admin/order/${order.id}`)}>
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
