import React, { useState } from 'react';
import './registerpage.css';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';


const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student'); // Default to 'student'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        // Set the role in the user's metadata
        const { data, error } = await supabase.auth.updateUser({
          data: {
            display_name: name,
            role: role, // Store the selected role in user metadata
          },
        });

        if (error) {
          setError(error.message);
        } else {
          console.log('User registered, display name and role set:', data);
          // Optionally, redirect or show a success message here
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const registered = () => {
    
    alert("Thank you for completing the survey!"); // Show the alert
    navigate("/onboarding"); // Navigate to /onboarding
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

            <div className="input-group">
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="content_creator">Content Creator</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading}
            onClick={registered}
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


