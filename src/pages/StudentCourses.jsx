import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const StudentsCoursesPage = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [course, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [uidlist, setUidlist] = useState([]);

    // Fetch user's courses from the database
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
        }
    };
    const fetchCoursesByIds = async (courseIds) => {
        if (courseIds.length === 0) return;

        const { data, error } = await supabase
            .from('lessons')
            .select('*') // Fetch all columns from the lessons table
            .in('uid', courseIds); // Filter based on the course IDs

        if (error) {
            console.error('Error fetching lessons:', error);
        } else {
            setCourses(data); // Update the courses state with the fetched lessons
        }
    };
    useEffect(() => {
        fetchuidlist();
    }, []);

    useEffect(() => {
        if (uidlist.length > 0) {
            fetchCoursesByIds(uidlist);
        }

    }, [uidlist])

    // Filter courses by search term
    const filteredCourses = course.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">My Courses</h2>

            {/* Search bar */}
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    className="w-1/4 p-3 border border-gray-300 rounded-lg"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Courses table */}
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left border-b font-semibold text-gray-600">Thumbnail</th>
                        <th className="px-4 py-2 text-left border-b font-semibold text-gray-600">Title</th>
                        <th className="px-4 py-2 text-left border-b font-semibold text-gray-600">Description</th>
                        <th className="px-4 py-2 text-left border-b font-semibold text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((lesson) => (
                        <tr key={lesson.id}>
                            <td className="px-4 py-2 border-b">
                                <img
                                    src={lesson.thumbnailurl} // Replace with the field storing thumbnail URL
                                    alt={lesson.title}
                                    className="w-24 h-16 object-cover"
                                />
                            </td>
                            <td className="px-4 py-2 border-b text-lg font-semibold text-blue-600">{lesson.title}</td>
                            <td className="px-4 py-2 border-b text-lg font-semibold text-blue-600">{lesson.description}</td>
                            <td className="px-4 py-2 border-b">
                                <div className="flex gap-2">
                                    <Link
                                        to={`/video`}
                                        state={{ lesson }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        View
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for editing a course */}
            {isModalOpen && selectedCourse && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Course</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Course Title"
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
                                value={selectedCourse.price || ''}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <div className="flex justify-between mt-4">
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
        </div>
    );
};

export default StudentsCoursesPage;

