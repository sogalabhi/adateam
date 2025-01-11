import React, { useState } from 'react';
import './registerpage.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">Join us to continue your learning journey.</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-grid">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="register-footer">
          Already have an account?{' '}
          <a href="#" className="login-link">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

