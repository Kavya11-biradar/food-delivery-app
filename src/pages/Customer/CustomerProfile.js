// src/pages/Customer/CustomerProfile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CustomerProfile = () => {
  //const userId = localStorage.getItem("userId");
  //const userId = 1; 
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    //  const userId = localStorage.getItem("userId");
    // if (!user) {
    //   console.error("User ID not found in localStorage.");
    //   return;
    // }

    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:8080/api/orders/user/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    console.error("User ID not found in localStorage.");
    return;
  }

  return (
    <div>
      <h2>Customer Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order Id {order.id} - {order.orderItems?.length || 0} items - Total: ${order.totalPrice}

            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default CustomerProfile;
