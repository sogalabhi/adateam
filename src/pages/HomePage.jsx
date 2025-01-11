import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Replace with your own Supabase URL and Key
const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const HomePage = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const [role, setRole] = useState(''); // State for user role
  const [userLoggedIn, setUserLoggedIn] = useState(false); // To track user login state
  const navigate = useNavigate(); // For navigation after sign-out
  const categories = ['Tech', 'Finance', 'Electronics', 'Marketing'];
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*');  // Get all data from the lessons table

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setLessons(data);
      }
    };

    const fetchUserRole = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      
      const userRole = data?.user?.user_metadata?.role;
      setRole(userRole);
      setUserLoggedIn(!!data); // Set userLoggedIn to true if user exists
    };

    fetchLessons();
    fetchUserRole();  // Fetch user role when the component mounts

    if (userLoggedIn) {
      window.history.replaceState(null, '', '/'); // Replace current history state to prevent going back
    }
  }, [userLoggedIn]); // Re-run effect when userLoggedIn changes

  const handleSignOutClick = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Redirect to the login page
      window.location.href = '/login';  // Adjust the path to your login page
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const toggleDropdown = () => {
    setShowSignOut(!showSignOut); // Toggle dropdown visibility
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 p-4 flex justify-between items-center">
        {/* Left side - Logo */}
        <div className="text-white font-bold text-2xl">
          EdTech
        </div>

        {/* Middle - Search Bar */}
        <div className="relative flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for videos, courses, etc."
            className="w-500 p-2 pl-10 rounded-lg bg-white text-gray-800 border-2 border-blue-500 focus:outline-none"
          />
        </div>

        {/* Right side - Profile and Power Button */}
        <div className="flex items-center space-x-4">
          {/* Profile Link */}
          <Link to="/profile" className="text-white font-medium hover:text-blue-300">
            My Profile
          </Link>

          {/* Power Button with Dropdown for Sign Out */}
          <div className="relative">
            <button
              onClick={toggleDropdown} // Toggle dropdown visibility on click
              className="text-white font-medium hover:text-blue-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showSignOut && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                {/* Upload Option for Content Creators */}
                {role === 'content_creator' && (
                  <Link
                    to="/upload"
                    className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                  >
                    Upload Content
                  </Link>
                )}

                {/* Sign Out Option */}
                <button
                  className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                  onClick={handleSignOutClick} // Sign out when button is clicked
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div>
        <h2 className="text-3xl relative left-2 font-semibold text-blue-600 my-6">Categories</h2>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <Link
            to={`/category/${category}`}
            key={category}
            className="bg-black text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <h3 className="text-xl">{category}</h3>
          </Link>
        ))}
      </div>

      {/* Video Thumbnails Section */}
      <div>
        <h3 className="text-2xl relative left-2 font-semibold text-blue-600 my-6">Latest Videos</h3>
      </div>

      {/* Video Thumbnails Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id} // Unique key for each video
            to={`/video`} // Link to the video player page
            state={{ lesson }} // Pass the lesson data to the video player page
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={lesson.thumbnailurl}
              alt={lesson.title}
            />
            <div className="p-4 flex justify-between">
              <h3 className="text-lg font-semibold text-blue-600">{lesson.title}</h3>
              <h3 className="text-lg font-semibold text-blue-600">{lesson.price === 0 ? 'Free' : 'Rs. ' + lesson.price}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
