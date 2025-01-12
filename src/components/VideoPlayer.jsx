import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    const location = useLocation();
    const { lesson } = location.state || {};
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/author', { state: { uuid: lesson.uuid, name: lesson.author } });
    };

    if (!lesson) {
        return <div className="text-center text-red-600 text-2xl font-bold mt-20">⚠️ Video not found!</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
            {/* Header Section */}
            <div className="bg-blue-700 text-white py-6 px-8 flex items-center justify-between rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold tracking-wider">🎓 Layers Learning</h1>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-200 transition duration-300"
                >
                    Home
                </button>
            </div>

            {/* Main Content Section */}
            <div className="mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Side - Video Player and Details */}
                <div className="space-y-8 m-0">
                    {/* Video Player */}
                    <div className="rounded-lg overflow-hidden border-4 border-blue-700 shadow-xl">
                        <ReactPlayer
                            url={lesson.content_url}
                            controls
                            width="100%"
                            height="100%"
                        />
                    </div>

                    {/* Video Title and Description */}
                    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-300 space-y-4">
                        <h2 className="text-4xl font-bold text-blue-700">{lesson.title}</h2>
                        <p className="mt-2 text-lg text-gray-800 leading-relaxed">{lesson.description}</p>
                        <p
                            className="mt-4 text-lg font-semibold text-blue-700 cursor-pointer hover:underline"
                            onClick={handleClick}
                        >
                            🎯 By: {lesson.author || 'Unknown'}
                        </p>
                    </div>
                </div>

                {/* Right Side - Video Summary */}
                <div className="p-8 bg-white rounded-xl  right-10 shadow-lg border border-gray-300 space-y-6">
                    <h3 className="text-3xl font-semibold text-blue-700">📘 Video Summary</h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                        {lesson.summary || 'No summary available for this video.'}
                    </p>
                </div>
            </div>

            {/* Footer Section */}
            <div className="text-center mt-16">
                <p className="text-gray-600 text-lg">© 2024 Layers Learning Platform</p>
            </div>
        </div>
    );
};

export default VideoPlayer;




