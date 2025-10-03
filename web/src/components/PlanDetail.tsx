import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import './PlanDetail.css';

interface Plan {
  id: number;
  title: string;
  description: string;
}

interface Suggestion {
  task_title: string;
  task_description: string;
  reasoning: string;
}

const PlanDetail = () => {
  const { planId } = useParams<{ planId: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) return;
      setLoading(true);
      try {
        const response = await apiClient.get(`/api/learning-plans/${planId}/`);
        setPlan(response.data);
      } catch (err) {
        console.error('Failed to fetch plan details:', err);
        setError('Could not load the details for this plan.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlanDetails();
  }, [planId]);

  const handleSuggestTask = async () => {
    if (!planId) return;
    setIsSuggestionLoading(true);
    setSuggestion(null);
    setError(''); // Clear previous errors before making a new request
    try {
      const response = await apiClient.get(`/api/learning-plans/${planId}/suggest-task/`);
      setSuggestion(response.data);
    } catch (err) {
      console.error('Failed to get AI suggestion:', err);
      if ((err as any).response?.status === 403) {
        setError('AI feature is not yet configured on the backend. Please contact your teammate.');
      } else {
        setError('Could not get an AI suggestion at this time.');
      }
    } finally {
      setIsSuggestionLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error && !plan) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="plan-detail-container">
      <header className="plan-detail-header">
        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
        <h1>{plan?.title}</h1>
        <p className="plan-description">{plan?.description}</p>
      </header>

      <main className="plan-detail-content">
        <div className="ai-feature-section">
          <h2>Adaptive AI Assistant</h2>
          <p>Click the button below to get a personalized next step for your learning journey.</p>
          <button onClick={handleSuggestTask} disabled={isSuggestionLoading} className="button-suggest-ai">
            {isSuggestionLoading ? '🧠 Thinking...' : '✨ Suggest Next Task'}
          </button>
        </div>

        {suggestion && (
          <div className="suggestion-card">
            <h3>Recommended Next Task: {suggestion.task_title}</h3>
            <p className="suggestion-description">{suggestion.task_description}</p>
            <div className="suggestion-reasoning">
              <strong>AI Reasoning:</strong> {suggestion.reasoning}
            </div>
          </div>
        )}
        
        {/* Corrected Comment Syntax Below */}
        {error && plan && <p className="error-message-inline">{error}</p>}
      </main>
    </div>
  );
};

export default PlanDetail;