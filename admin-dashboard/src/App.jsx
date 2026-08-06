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
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.3" />
                </filter>
              </defs>
              <g filter="url(#logoShadow)">
                <ellipse cx="60" cy="42" rx="52" ry="38" fill="#e31e24" />
                <path d="M66 12 L43 42 H56 L54 72 L77 42 H64 Z" fill="#ffffff" />
                <text x="60" y="108" font-family="'Space Grotesk', system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" font-style="italic" fill="#4e3797" stroke="#ffffff" stroke-width="4px" paint-order="stroke fill" text-anchor="middle">LPIS</text>
              </g>
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
