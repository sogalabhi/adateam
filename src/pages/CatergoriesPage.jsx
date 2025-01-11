import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

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
        .select('*')  // Get all data from the lessons table
        .filter('tags', 'cs', `{${tag}}`);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setLessons(data);
      }
      console.log(data);
    };
    fetchLessons(categoryName)
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        Category
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
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-600">{lesson.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
