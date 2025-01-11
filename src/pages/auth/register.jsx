import React, { useState } from 'react';
import './registerpage.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        setError(error.message); // Handle the error message returned by Supabase
      } else {
        // Registration successful
        console.log('User registered:', data.user);
        // Optionally, redirect the user or show a success message
      }
    } catch (error) {
      setError(error.message);  // Catch any other errors
    } finally {
      setLoading(false);
    }
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

