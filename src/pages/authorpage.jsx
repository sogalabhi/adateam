import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthorCoursesPage = () => {
    const location = useLocation();
    const { uuid, name } = location.state || ''; // Retrieve the passed string
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [course, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [uidlist, setUidlist] = useState([]);

    const navigate = useNavigate();
    // Fetch user's courses from the database
    const fetchLessons = async (uuid) => {
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .filter('uuid', 'eq', uuid);
        var arr = [];
        data.map(lesson => {
            if (!uidlist.includes(lesson['uid'])) {
                arr.push(lesson);
            }
        });
        console.log(arr);
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            setCourses(arr);
        }
    };
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
    useEffect(() => {
        if (uuid) fetchLessons(uuid);
        else setCourses([]);
        fetchuidlist();
    }, []);

    // Filter courses by search term
    const filteredCourses = course.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar/>
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">{name}'s Courses</h2>

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
                        <th className="px-4 py-2 text-left border-b font-semibold text-gray-600">Price</th>
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
                            <td className="px-4 py-2 border-b text-lg font-semibold text-blue-600">{lesson.price === 0 ? 'Free' : 'Rs. ' + lesson.price}</td>
                            <td className="px-4 py-2 border-b">
                                <div className="flex gap-2">
                                    <button onClick={() => lesson.price === 0 ? handleAddToMyCourseClick(lesson) : handleBuyNowClick(lesson)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        {lesson.price === 0 ? 'Add to My Courses' : 'Buy now'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuthorCoursesPage;

