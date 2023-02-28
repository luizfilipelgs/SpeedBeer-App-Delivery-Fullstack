import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </LoginProvider>
  );
}

export default App;
