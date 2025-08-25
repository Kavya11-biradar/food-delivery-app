import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();

  const { adminId } = useParams();

  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch admin profile
    // axios.get(`http://localhost:8080/api/admins/${adminId}`)
    axios.get(`http://localhost:8080/api/users/admin/${adminId}`)

      .then(res => setAdmin(res.data))
      .catch(err => {
        console.error(err);
        setError('Admin not found.');
      });

    // Fetch all orders (admin can see all)
    // axios.get('http://localhost:8080/api/orders')
    axios.get('http://localhost:8080/api/orders/admin/all')

      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [adminId]);

  if (error) return <p>{error}</p>;
  if (!admin) return <p>Loading admin profile...</p>;

  return (
    <div>
      <h2>Admin Profile</h2>
      <p><strong>Name:</strong> {admin.name}</p>
      <p><strong>Email:</strong> {admin.email}</p>

      <h3>All User Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (

            <li key={order.id}>
              Order Id   {order.id}


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

export default AdminProfile;
