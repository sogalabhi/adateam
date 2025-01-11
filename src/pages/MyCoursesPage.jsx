import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const MyCoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [course, setCourses] = useState([]);
  // Fetch user's courses from the database
  const fetchLessons = async () => {

    var user = await supabase.auth.getUser();
    var uuid = user['data']['user']['id'];
    const { data, error } = await supabase
      .from('lessons')
      .select('*')  // Get all data from the course table
      .filter('uuid', 'eq', uuid);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setCourses(data);
    }
  };
  useEffect(() => {
    fetchLessons()
  }, [])
  // Open the modal with selected course data
  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id); // Delete the course by ID

    if (error) {
      console.error('Error deleting course:', error);
    } else {
      fetchLessons(); // Refresh the list after deletion
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse((prev) => {
      if (!prev) return null; // Prevent issues if `selectedCourse` is not set
      return { ...prev, [name]: value };
    });
  };
  // Submit updated data to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('lessons')
      .update({
        title: selectedCourse.title,
        description: selectedCourse.description,
        price: selectedCourse.price,
      })
      .eq('id', selectedCourse.id);
    if (error) {
      console.error('Error updating course:', error.message);
    } else {
      setIsModalOpen(false);
      fetchLessons(); // Refresh the courses after update
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-blue-600  mb-4">My Courses</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Views Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {course.map(lesson => (
            <tr key={lesson.id}>

              <td>
                <img
                  src={lesson.thumbnailurl} // Replace with the field storing thumbnail URL
                  alt={lesson.title}
                  style={{ width: '150px', height: 'auto' }}
                />
              </td>
              <td className='text-lg font-semibold text-blue-600'>{lesson.title}</td>
              <td className='text-lg font-semibold text-blue-600'>{lesson.description}</td>
              <td className='text-lg font-semibold text-blue-600'>10</td>
              <td>
                <button
                  className='bg-blue-600 text-white px-4 py-2 rounded mr-2'>
                  <Link
                    key={lesson.id} // Unique key for each video
                    to={`/video`} // Link to the video player page
                    state={{ lesson }} // Pass the lesson data to the video player page
                  >
                    View
                  </Link>
                </button>
                <button className='bg-blue-600 text-white px-4 py-2 rounded mr-2' onClick={() => handleEdit(lesson)}>Edit</button>
                <button className='bg-blue-600 text-white px-4 py-2 rounded' onClick={() => handleDelete(lesson.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedCourse && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
            <h3>Edit Course</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Video Title"
                value={selectedCourse.title || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={selectedCourse.description || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={selectedCourse.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                required
              />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div >
  );
};

export default MyCoursesPage;
