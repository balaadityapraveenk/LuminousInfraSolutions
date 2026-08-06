import React, { useState, useEffect } from 'react';
import './App.css';
import AdminQuotes from './components/AdminQuotes';

const ADMIN_USERNAME = 'admin';
// Fallback password if VITE_ADMIN_PASSWORD is not set
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'LuminousAdmin2026';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if session exists
    const sessionAuth = sessionStorage.getItem('adminAuth');
    if (sessionAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    if (username.trim().toLowerCase() === ADMIN_USERNAME && password === DEFAULT_ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true');
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (isLoggedIn) {
    return <AdminQuotes onLogout={handleLogout} />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-container">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L4.09347 12.6879C3.74466 13.1064 4.04236 13.75 4.58559 13.75H11L10 22L19.9065 11.3121C20.2553 10.8936 19.9576 10.25 19.4144 10.25H13L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Luminous Admin</h1>
          <p>Access quote request management portal</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
