import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerHome from './pages/Customer/CustomerHome';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RestaurantDetail from './pages/Customer/RestaurantDetail';
import Cart from './pages/Customer/Cart';
import CustomerProfile from './pages/Customer/CustomerProfile';
import AddRestaurant from './pages/Admin/AddRestaurant';
import AddFood from './pages/Admin/AddFood';
import ViewOrders from './pages/Admin/ViewOrders';
import OrderDetails from './pages/Admin/OrderDetails';
import AdminProfile from './pages/Admin/AdminProfile';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
//import Register from './pages/Register';


function App() {
  return (
    <Router>
      <Routes>
         <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<HomePage />} />

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customer/profile/:userId" element={<CustomerProfile />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-restaurant" element={<AddRestaurant />} />
        <Route path="/admin/add-food" element={<AddFood />} />
        <Route path="/admin/orders" element={<ViewOrders />} />
        <Route path="/admin/order/:id" element={<OrderDetails />} />
         <Route path="/admin/profile/:adminId" element={<AdminProfile />} />

        {/* <Route path="/admin/profile" element={<AdminProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
