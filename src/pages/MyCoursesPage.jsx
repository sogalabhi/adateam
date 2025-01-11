import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const MyCoursesPage = () => {
  const courses = [
    { id: 1, title: 'React for Beginners' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'Finance 101' },
  ];

  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    //Fetch user uuid
    // Fetch user's courses from the database
    const fetchLessons = async () => {

      var user = await supabase.auth.getUser();
      var uuid = user['data']['user']['id'];
      const { data, error } = await supabase
        .from('lessons')
        .select('*')  // Get all data from the lessons table
        .filter('uuid', 'eq', uuid);

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setLessons(data);
      }
    };
    fetchLessons()
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-semibold text-blue-600  mb-4">My Courses</h2>
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
              <h3 className="text-lg font-semibold text-blue-600">{lesson.price == 0 ? 'Free' : 'Rs. ' + lesson.price}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesPage;
