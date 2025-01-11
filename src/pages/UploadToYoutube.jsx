import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY_HERE';
const supabase = createClient(supabaseUrl, supabaseKey);

const VideoUploadPage = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => setVideoFile(e.target.files[0]);
    const handleThumbnailFileChange = (e) => setThumbnailFile(e.target.files[0]);

    const handleSubmit = async () => {
        if (!videoFile || !thumbnailFile || !title || !description) {
            setUploadStatus('Please fill in all fields and upload files.');
            return;
        }

        try {
            const fileName = `${Date.now()}_${videoFile.name}`;
            const thumbnailFileName = `${Date.now()}_thumb_${thumbnailFile.name}`;

            // Upload video and thumbnail
            await supabase.storage.from('videos').upload(fileName, videoFile);
            await supabase.storage.from('thumbnails').upload(thumbnailFileName, thumbnailFile);

            const videoUrl = `${supabaseUrl}/storage/v1/object/public/videos/${fileName}`;
            const thumbnailUrl = `${supabaseUrl}/storage/v1/object/public/thumbnails/${thumbnailFileName}`;

            // Insert video details into database
            await supabase.from('lessons').insert([
                { title, description, content_url: videoUrl, thumbnailurl: thumbnailUrl, tags: tags.split(',') }
            ]);

            setUploadStatus('Video uploaded successfully!');
        } catch (error) {
            console.error('Error uploading video:', error);
            setUploadStatus('Error uploading video. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-6">Share Your Content</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-black">
                <input
                    type="text"
                    placeholder="Video Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailFileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Upload Video
                </button>
                {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
            </div>
        </div>
    );
};

export default VideoUploadPage;
