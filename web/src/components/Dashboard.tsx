import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

// Define a type for what a Learning Plan object looks like
interface LearningPlan {
  id: number;
  title: string;
  description: string;
  // Add any other fields that come from the backend here
}

const Dashboard = () => {
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // useEffect runs once when the component is first loaded
  useEffect(() => {
    const fetchLearningPlans = async () => {
      try {
        // Make the GET request to the learning plans endpoint
        const response = await apiClient.get('/api/learning-plans/');
        setPlans(response.data); // Save the fetched plans in our state
      } catch (err) {
        console.error('Failed to fetch learning plans:', err);
        setError('Could not load learning plans.');
      } finally {
        setLoading(false); // Stop loading, whether it succeeded or failed
      }
    };

    fetchLearningPlans();
  }, []); // The empty array [] means this effect runs only once

  const handleLogout = () => {
    // Clear the tokens from storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>My Learning Plans</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      
      <main className="dashboard-content">
        {loading && <p>Loading plans...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && (
          <div className="plans-list">
            {plans.length > 0 ? (
              plans.map(plan => (
                <div key={plan.id} className="plan-card">
                  <h2>{plan.title}</h2>
                  <p>{plan.description}</p>
                </div>
              ))
            ) : (
              <p>No learning plans found. Create one to get started!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;