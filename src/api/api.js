import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // adjust based on your backend
});

// Customer APIs
export const fetchRestaurants = () => API.get('/restaurants');
export const fetchFoodItems = (restaurantId) => API.get(`/restaurants/${restaurantId}/items`);
export const placeOrder = (orderData) => API.post('/orders/place', orderData);
export const addAddress = (address) => API.post('/addresses', address);
export const getUserProfile = (id) => API.get(`/users/${id}`);

// Admin APIs
export const addRestaurant = (restaurant) => API.post('/restaurants', restaurant);
export const addFoodItem = (foodItem) => API.post('/fooditems', foodItem);
export const fetchOrders = () => API.get('/orders');
export const fetchOrderById = (orderId) => API.get(`/orders/${orderId}`);
