import React, { useState } from 'react';
import './Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="register-container">
      <div className="register-card">
        
        <h1 className="title">Create Your Account</h1>
        <p className="subtitle">Join NeuroFix to start your adaptive learning journey.</p>

        <form className="register-form">
          <div className="input-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email Id" required />
          </div>
          <div className="input-group">
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Password" 
              required 
            />
            <span className="password-toggle-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="input-group">
            <input 
              type={confirmPasswordVisible ? "text" : "password"} 
              placeholder="Confirm Password" 
              required 
            />
            <span className="password-toggle-icon" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="register-button-primary">
            CREATE ACCOUNT
          </button>
        </form>
        
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>
    </div>
  );
};

export default Register;