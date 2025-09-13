import React from 'react';
import './ForgotPassword.css'; // We will create this file next

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        
        <h1 className="title">Forgot Password?</h1>
        <p className="subtitle">No worries, we'll send you reset instructions.</p>

        <form className="forgot-password-form">
          <div className="input-group">
            <input type="email" placeholder="Enter your email" required />
          </div>
          <button type="submit" className="submit-button">
            SEND RESET LINK
          </button>
        </form>
        
        <p className="back-to-login-link">
          <a href="/login">← Back to Login</a>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;