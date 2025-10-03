import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import './Dashboard.css';
import { useAuth } from '../context/AuthContext';

interface LearningPlan {
  id: number;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newPlanDescription, setNewPlanDescription] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);

  const fetchLearningPlans = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/learning-plans/');
      setPlans(response.data);
    } catch (err) {
      console.error('Failed to fetch learning plans:', err);
      setError('Could not load learning plans.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningPlans();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/api/learning-plans/', {
        title: newPlanTitle,
        description: newPlanDescription,
      });
      setIsCreateModalOpen(false);
      setNewPlanTitle('');
      setNewPlanDescription('');
      fetchLearningPlans();
    } catch (err) {
      console.error('Failed to create plan:', err);
      setError('Could not create the learning plan.');
    }
  };

  const handleDeletePlan = async (planId: number) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await apiClient.delete(`/api/learning-plans/${planId}/`);
        fetchLearningPlans();
      } catch (err) {
        console.error('Failed to delete plan:', err);
        setError('Could not delete the learning plan.');
      }
    }
  };

  const openEditModal = (plan: LearningPlan) => {
    setCurrentPlan(plan);
    setIsEditModalOpen(true);
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlan) return;
    try {
      await apiClient.put(`/api/learning-plans/${currentPlan.id}/`, {
        title: currentPlan.title,
        description: currentPlan.description,
      });
      setIsEditModalOpen(false);
      setCurrentPlan(null);
      fetchLearningPlans();
    } catch (err) {
      console.error('Failed to update plan:', err);
      setError('Could not update the learning plan.');
    }
  };

  return (
    <>
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Learning Plan</h2>
            <form onSubmit={handleCreatePlan}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" value={newPlanTitle} onChange={(e) => setNewPlanTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" value={newPlanDescription} onChange={(e) => setNewPlanDescription(e.target.value)} />
              </div>
              <div className="modal-actions">
                <button type="button" className="button-secondary" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
                <button type="submit" className="button-primary">Create Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && currentPlan && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Learning Plan</h2>
            <form onSubmit={handleUpdatePlan}>
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input id="edit-title" type="text" value={currentPlan.title} onChange={(e) => setCurrentPlan({ ...currentPlan, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea id="edit-description" value={currentPlan.description} onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="button-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="button-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>My Learning Plans</h1>
          <div className="header-actions">
            {user && user.role === 'GUIDE' && (
              <button onClick={() => setIsCreateModalOpen(true)} className="button-primary">
                + Create New Plan
              </button>
            )}
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </header>
        
        <main className="dashboard-content">
          {loading && <p>Loading plans...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {!loading && !error && (
            <div className="plans-list">
              {plans.length > 0 ? (
                plans.map(plan => (
                  <div key={plan.id} className="plan-card">
                    <Link to={`/dashboard/plan/${plan.id}`} className="plan-card-link">
                      <div className="plan-card-content">
                        <h2>{plan.title}</h2>
                        <p>{plan.description}</p>
                      </div>
                    </Link>
                    <div className="plan-card-actions">
                      <button onClick={(e) => { e.stopPropagation(); openEditModal(plan); }} className="button-edit">Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeletePlan(plan.id); }} className="button-delete">Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <h3>No learning plans found.</h3>
                  <p>Create one to get started!</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;