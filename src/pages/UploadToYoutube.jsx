import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const VideoUploadPage = () => {
    const [username, setusername] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploading, setUploading] = useState();
    const [thumbnailuploading, setThumbnailUploading] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const user = await supabase.auth.getUser();
        const name = user['data']['user']['user_metadata']['display_name'];
        setusername(name);
        if (!session) {
            setErrorMessage("Please log in to upload a video.");
        }
        return session;
    };
    useEffect(() => {
        getSession();
    }, []);

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };
    const handleThumbnailFileChange = (e) => {
        setThumbnailFile(e.target.files[0]);
    };

    const generateSummary = async (videourl) => {
        const response = await fetch('http://127.0.0.1:5000/post-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videourl }),
        });
        const { summary } = await response.json();
        return summary;
    }

    const handleSubmit = async () => {
        if (!videoFile || !thumbnailFile || !title || !description) {
            setUploadStatus('Please fill in all fields and upload files.');
            return;
        }

        try {
            const fileName = `${Date.now()}_${videoFile.name}`;
            const thumbnailFileName = `${Date.now()}_thumb_${thumbnailFile.name}`;

            const session = await getSession();
            if (!session) {
                setErrorMessage("Please log in to upload a video.");
                return;
            }

            if (!videoFile) {
                setErrorMessage("Please select a video to upload!");
                return;
            }
            if (!thumbnailFile) {
                setErrorMessage("Please select a thumbnail to upload!");
                return;
            }

            setUploading(true);
            setThumbnailUploading(true);
            setErrorMessage(null);
            setSuccessMessage(null);

            const { data, error: uploadError } = await supabase
                .storage
                .from("videos") // Ensure this is the correct bucket name
                .upload(fileName, videoFile, {
                    cacheControl: "3600",
                    upsert: false,
                });
            const { data: data2, error: uploadError2 } = await supabase
                .storage
                .from("thumbnails") // Ensure this is the correct bucket name
                .upload(thumbnailFileName.replace(/\s+/g, ''), thumbnailFile, {
                    cacheControl: "3600",
                    upsert: false,
                });
            if (uploadError) {
                console.error("Error during upload:", uploadError.message);
                setErrorMessage(`Error uploading video: ${uploadError.message}`);
                setUploading(false);
                return;
            }
            if (uploadError2) {
                console.error("Error during upload thumbanil:", uploadError2.message);
                setErrorMessage(`Error uploading thumbnail: ${uploadError2.message}`);
                setThumbnailUploading(false);
                return;
            }
            console.log("File uploaded successfully:", data);
            // Get the public URL of the uploaded video
            const videoUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/' + data.fullPath
            const thumbnailurl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/thumbnails/' + thumbnailFileName.replace(/\s+/g, '');
            console.log(thumbnailurl);
            if (!videoUrl) {
                console.error("Error fetching public URL:", urlError.message);
                setErrorMessage(`Error fetching video URL: ${urlError.message}`);
            } else {
                console.log(tags);

                var summary = await generateSummary(videoUrl)
                console.log(summary);
                // Step 3: Insert video details into Supabase database
                const { data: insertData, error: insertError } = await supabase
                    .from('lessons')
                    .insert([
                        {
                            uuid: session.user.id,
                            title: title,
                            description: description,
                            thumbnailurl: thumbnailurl,
                            content_url: videoUrl,
                            price: price,
                            tags: tags,
                            summary: summary,
                            author: username
                        },
                    ]);

                if (insertError) {
                    console.error('Error inserting lesson:', insertError.message);
                    setUploadStatus('Error saving lesson details.');
                    return;
                }
                if (insertData) {
                    console.log('insertData');
                }
                setUploadStatus('Lesson added successfully!');
                console.log("Video uploaded successfully. Public URL:", videoUrl);
                setSuccessMessage("Video uploaded successfully!");
            }

            setUploadStatus('Video uploaded successfully!');
        } catch (error) {
            console.error('Error uploading video:', error);
            setUploadStatus('Error uploading video. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-600 p-8 m-0 text-white">
            <h1 className="text-4xl  font-bold mb-6">Share Your Content</h1>
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
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                    onChange={(e) => setTags((e.target.value).split(',').map(element => element.trim()))}
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
