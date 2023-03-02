import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/checkout" />
      </Routes>
    </LoginProvider>
  );
}

export default App;
