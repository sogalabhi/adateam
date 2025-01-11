import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/Navbar';

export default function CatergoriesPage() {
  const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [lessons, setLessons] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchLessons = async (tag) => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .filter('tags', 'cs', `{${tag}}`);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setLessons(data);
      }
      console.log(data);
    };
    fetchLessons(categoryName);
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-left mt-4 ml-2">Category: {categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/video`}
            state={{ lesson }}
            className="group bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={lesson.thumbnailurl}
              alt={lesson.title}
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-800">{lesson.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


