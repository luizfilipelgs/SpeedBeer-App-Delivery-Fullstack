import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Login from './pages/FormLogin';
import Register from './pages/Register';
import Products from './pages/Products';
import CustomerOrder from './pages/CustomerOrder';
import Checkout from './pages/Checkout';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import AdminManage from './pages/AdminManage';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/customer/orders" element={ <CustomerOrder /> } />
        <Route path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
        <Route path="/seller/orders" element={ <CustomerOrder /> } />
        <Route path="/seller/orders/:id" element={ <CustomerOrderDetails /> } />
        <Route path="/admin/manage" element={ <AdminManage /> } />
      </Routes>
    </LoginProvider>
  );
}

export default App;
