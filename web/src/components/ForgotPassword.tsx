import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import apiClient from '../api/axiosConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Send the POST request to the password reset endpoint
      const response = await apiClient.post('/api/password-reset/', { email });
      setSuccess(response.data.detail); // Display the success message from the backend
    
    } catch (err: any) {
      if (err.response && err.response.data) {
        const messages = Object.values(err.response.data).join(' ');
        setError(messages);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        
        <h1 className="title">Forgot Password?</h1>
        <p className="subtitle">No worries, we'll send you reset instructions.</p>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'SENDING...' : 'SEND RESET LINK'}
          </button>
        </form>
        
        <p className="back-to-login-link">
          <Link to="/login">← Back to Login</Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;