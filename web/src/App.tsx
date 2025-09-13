import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; // Import the new component

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the registration page */}
        <Route path="/register" element={<Register />} />

        {/* Route for the forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Any other URL will automatically redirect to the login page */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;