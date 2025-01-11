import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/Navbar';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);


const HomePage = () => {
  const navigate = useNavigate(); // For navigation after sign-out
  const categories = ['Tech', 'Finance', 'Electronics', 'Marketing'];
  const [lessons, setLessons] = useState([]);


  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase.from('lessons').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setLessons(data);
      }
    };

    fetchLessons();
  }, []); // Re-run effect when userLoggedIn changes

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="text-3xl relative left-2 font-semibold text-blue-600 my-6">Categories</h2>
      </div>
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

      <div>
        <h3 className="text-2xl relative left-2 font-semibold text-blue-600 my-6">Latest Videos</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/video`}
            state={{ lesson }}
            className="group relative bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                className="w-full h-48 object-cover"
                src={lesson.thumbnailurl}
                alt={lesson.title}
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">By {lesson.author ? lesson.author : 'Unknown'}</span>
              </div>
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-600">{lesson.title}</h3>

              </div>
              <h3 className="text-lg font-semibold text-blue-600">{lesson.price == 0 ? 'Free' : 'Rs. ' + lesson.price}</h3>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default HomePage;
