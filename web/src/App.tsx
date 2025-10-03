import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import PlanDetail from './components/PlanDetail'; // 1. Import the new component

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main Application Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 2. Add the new dynamic route for plan details */}
        <Route path="/dashboard/plan/:planId" element={<PlanDetail />} />

        {/* Default route redirects to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;