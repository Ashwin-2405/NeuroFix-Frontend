import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [role, setRole] = useState('STUDENT'); // New state for role, defaults to STUDENT
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      // Updated to use the new registration endpoint and payload
      await apiClient.post('/api/register/', {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role, // Added the new role field
      });

      setSuccess('Registration successful! Please log in.');

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
    <div className="register-container">
      <div className="register-card">
        <h1 className="title">Create Your Account</h1>
        <p className="subtitle">Join NeuroFix to start your adaptive learning journey.</p>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* New Role Selector UI */}
          <div className="role-selector">
            <label>I am a:</label>
            <div className="role-options">
              <button type="button" className={role === 'STUDENT' ? 'active' : ''} onClick={() => setRole('STUDENT')}>
                Student
              </button>
              <button type="button" className={role === 'GUIDE' ? 'active' : ''} onClick={() => setRole('GUIDE')}>
                Guide
              </button>
            </div>
          </div>

          <div className="input-group">
            <input name="fullName" type="text" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input name="email" type="email" placeholder="Email Id" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="register-button-primary" disabled={loading}>
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>
        
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;