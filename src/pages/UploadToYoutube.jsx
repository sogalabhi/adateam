import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

// Replace with your own Supabase URL and Key
const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const VideoUploadPage = () => {

    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [lessonOrder, setLessonOrder] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [price, setPrice] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const [contentType] = useState('video'); // Static content type for now
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
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
        // Create a temporary video element to load the file
        // const videoElement = document.createElement('video');
        // videoElement.src = URL.createObjectURL(videoFile);

        // videoElement.onloadedmetadata = () => {
        //     setVideoDuration(videoElement.duration); // Duration in seconds
        // };
    };

    const handleSubmit = async () => {
        const session = await getSession();
        if (!session) {
            setErrorMessage("Please log in to upload a video.");
            return;
        }

        if (!videoFile) {
            setErrorMessage("Please select a video to upload!");
            return;
        }

        setUploading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            // Upload video to Supabase Storage
            const fileName = Date.now() + "_" + videoFile.name;
            const { data, error: uploadError } = await supabase
                .storage
                .from("videos") // Ensure this is the correct bucket name
                .upload(fileName, videoFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) {
                console.error("Error during upload:", uploadError.message);
                setErrorMessage(`Error uploading video: ${uploadError.message}`);
                setUploading(false);
                return;
            }

            console.log("File uploaded successfully:", data);

            // Get the public URL of the uploaded video
            const url = 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/videos/' + data.fullPath
            console.log(url);
            if (!url) {
                console.error("Error fetching public URL:", urlError.message);
                setErrorMessage(`Error fetching video URL: ${urlError.message}`);
            } else {
                // Step 3: Insert video details into Supabase database
                const { data: insertData, error: insertError } = await supabase
                    .from('lessons')
                    .insert([
                        {
                            id: session.user.id,
                            description: description,
                            title: title,
                            content_url: url,
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
                console.log("Video uploaded successfully. Public URL:", url);
                setSuccessMessage("Video uploaded successfully!");
            }
        } catch (error) {
            console.error("Error uploading video:", error);
            setErrorMessage(`Error uploading video: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Add Lesson</h2>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <br />
            <label>Desriptiion:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <br />
            <label>Section ID:</label>
            <input
                type="number"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                required
            />
            <br />
            <label>Price (₹):</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <br />
            <label>Upload Video:</label>
            <input type="file" accept="video/*" onChange={handleFileChange} required />
            <button
                type="submit"
                onClick={handleSubmit}
                style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Add Lesson
            </button>
            <p>{uploadStatus}</p>
        </div>

    );
};

export default VideoUploadPage;
