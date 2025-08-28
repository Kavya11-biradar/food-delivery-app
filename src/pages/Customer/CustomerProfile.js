import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/CustomerProfile.css"; 

const CustomerProfile = () => {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:8080/api/orders/user/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Customer Profile</h2>

      <div className="user-info">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h3 className="orders-title">🛒 Your Orders</h3>

      {orders.length === 0 ? (
        <p className="no-orders-msg">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Items:</strong> {order.orderItems?.length || 0}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
