import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useTrail, animated } from '@react-spring/web'; // Import react-spring
import './LoginPage.css';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseAnonKey = 'your-anon-key-here';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email, password,
        });
        if (error) {
            setError(error.message);
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    // React-spring Trail Animation for form fields
    const items = ['Email', 'Password', 'Login Button'];
    const trail = useTrail(items.length, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        delay: 300
    });

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold text-blue-600 text-center mb-4">Welcome Back!</h2>
                <p className="text-gray-600 text-center mb-6">Log in to continue your journey.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Trail Animation for Inputs */}
                    {trail.map((style, index) => (
                        <animated.div key={index} style={style}>
                            {index === 0 && (
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            )}
                            {index === 1 && (
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            )}
                            {index === 2 && (
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            )}
                        </animated.div>
                    ))}
                </form>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                <p className="text-center text-gray-700 mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;


