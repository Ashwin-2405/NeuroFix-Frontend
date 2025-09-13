import React from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        
        <h1 className="logo-text">NeuroFix</h1>
        <p className="subtitle">Login to your NeuroFix account</p>

        <form className="login-form">
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
          <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
          <button type="submit" className="login-button-primary">
            LOGIN
          </button>
        </form>

        <div className="separator">OR</div>

        <div className="social-login-container">
          <button className="social-icon-button" aria-label="Continue with Google">
            <svg viewBox="0 0 48 48" width="24" height="24">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571
                l6.19,5.238C42.012,36.494,44,30.861,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
          </button>
          
          <button className="social-icon-button" aria-label="Continue with Microsoft">
            <svg viewBox="0 0 21 21" width="22" height="22">
              <path fill="#f25022" d="M1 1h9v9H1z"/>
              <path fill="#00a4ef" d="M1 11h9v9H1z"/>
              <path fill="#7fba00" d="M11 1h9v9h-9z"/>
              <path fill="#ffb900" d="M11 11h9v9h-9z"/>
            </svg>
          </button>
        </div>
        
        <p className="register-link">
          Don't have an account? <a href="/register">Register Now</a>
        </p>

      </div>
    </div>
  );
};

export default Login;