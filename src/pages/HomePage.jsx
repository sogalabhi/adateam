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
  const [courses, setCourses] = useState([]);
  const [uidlist, setUidlist] = useState([]);
  const [searchtitle, setSearchtitle] = useState('');

  const fetchuidlist = async () => {
    var user = await supabase.auth.getUser();
    var uuid = user['data']['user']['id'];
    const { data, error } = await supabase
      .from('users_info')
      .select('mycourses')
      .eq('uuid', uuid)  // Filter by UUID
      .single(); // To get a single row

    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setUidlist(data ? data.mycourses : []);
      console.log(data.mycourses);
    }
  };
  const fetchLessons = async () => {
    const { data, error } = await supabase.from('lessons').select('*').limit(9);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      var arr = [];
      data.map(lesson => {
        if (!uidlist.includes(lesson['uid'])) {
          arr.push(lesson);
        }
      });
      setLessons(arr);
    }
  };
  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*').limit(9);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setCourses(data);
    }
  };
  useEffect(() => {
    fetchLessons();
    fetchuidlist();
    fetchCourses();
  }, []);

  const handleBuyNowClick = (lesson) => {
    // Navigate to payment route with the selected lesson data
    navigate('/payment', { state: { lesson } });
  };
  const handleAddToMyCourseClick = async (lesson) => {
    try {

      // Fetch the user data with the given uuid
      const user = await supabase.auth.getUser();
      const uuid = user['data']['user']['id'];
      const { data, error } = await supabase
        .from('users_info')
        .select('uuid, mycourses')
        .eq('uuid', uuid)
        .single();

      if (error && error.code === 'PGRST116') {
        // If the user does not exist, create a new row with uuid and the mycourses field
        const { insertError } = await supabase
          .from('users_info')
          .insert([{ uuid, mycourses: [lesson.uid] }]);

        if (insertError) {
          console.error('Error inserting new user:', insertError);
        } else {
          console.log('New user created successfully!');
        }
      } else if (data) {
        // If user exists, update the mycourses field
        const currentCourses = data.mycourses || [];
        const updatedCourses = [...new Set([...currentCourses, lesson.uid])];

        const { updateError } = await supabase
          .from('users_info')
          .update({ mycourses: updatedCourses })
          .eq('uuid', uuid);

        if (updateError) {
          console.error('Error updating courses:', updateError);
        } else {
          console.log('Courses updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error updating mycourses:', error);
    }
    // Navigate to payment route with the selected lesson data
    navigate('/video', { state: { lesson } });
  };
  const handleCoursesView = async (lesson) => {
    navigate('/viewcourse', { state: { uid: lesson.uid, title: lesson.title } });
  }

  const handleSearch = async (searchtitle) => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .textSearch('title', searchtitle)
      .limit(9);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setLessons(data);
    }
  }
  useEffect(() => {
    if (searchtitle.length > 0)
      handleSearch(searchtitle)
  }, [searchtitle])

  return (
    <div>
      <Navbar searchtitle={searchtitle} setSearchtitle={setSearchtitle} />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="group relative bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                className="w-full h-48 object-cover"
                src={lesson.thumbnailurl}
                alt={lesson.title}
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => lesson.price === 0 ? handleAddToMyCourseClick(lesson) : handleBuyNowClick(lesson)} // Navigate to payment route
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transform transition-transform duration-300 ease-in-out hover:bg-white hover:text-blue-600 hover:scale-105 focus:outline-none"
                >
                  {lesson.price === 0 ? 'Add to My Courses' : 'Buy now'}
                </button>
              </div>
            </div>
            <div className="p-4 flex justify-between items-start">
              <div cla>
                <h3 className="text-lg font-semibold text-blue-600">{lesson.title}</h3>
                <h3 className="text-xs font-semibold text-blue-600">By {lesson.author || 'Unknown'}</h3>
              </div>
              <div className="flex items-start">
                <h3 className="text-lg font-semibold text-blue-600">
                  {lesson.price === 0 ? 'Free' : 'Rs. ' + lesson.price}
                </h3>
              </div>

            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-2xl relative left-2 font-semibold text-blue-600 my-6">Latest Courses</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group relative bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                className="w-full h-48 object-cover"
                src={course.thumbnailurl}
                alt={course.title}
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleCoursesView(course)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transform transition-transform duration-300 ease-in-out hover:bg-white hover:text-blue-600 hover:scale-105 focus:outline-none"
                >
                  View
                </button>
              </div>
            </div>
            <div className="p-4 flex justify-between items-start">
              <div cla>
                <h3 className="text-lg font-semibold text-blue-600">{course.title}</h3>
              </div>
              <div className="flex items-start">
                <h3 className="text-lg font-semibold text-blue-600">
                  By {course.author || 'Unknown'}
                </h3>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HomePage;

