import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

// Replace with your own Supabase URL and Key
const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

const VideoUploadPage = () => {

    const [uploading, setUploading] = useState(false);
    const [thumbnailUploading, setThumbnailUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
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
    };
    const handleThumbnailFileChange = (e) => {
        setThumbnailFile(e.target.files[0]);
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
        if (!thumbnailFile) {
            setErrorMessage("Please select a thumbnail to upload!");
            return;
        }

        setUploading(true);
        setThumbnailUploading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            // Upload video to Supabase Storage
            const fileName = Date.now() + "_" + videoFile.name;
            const thumbnailfileName = Date.now() + "_img_" + thumbnailFile.name;
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
                .upload(thumbnailfileName.replace(/\s+/g, ''), thumbnailFile, {
                    cacheControl: "3600",
                    upsert: false,
                });
            print(data2);
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
            const url = 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/' + data.fullPath
            const thumbnailurl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/thumbnails/' + thumbnailfileName.replace(/\s+/g, '');
            console.log(thumbnailurl);
            if (!url) {
                console.error("Error fetching public URL:", urlError.message);
                setErrorMessage(`Error fetching video URL: ${urlError.message}`);
            } else {
                console.log(tags);
                // Step 3: Insert video details into Supabase database
                const { data: insertData, error: insertError } = await supabase
                    .from('lessons')
                    .insert([
                        {
                            uuid: session.user.id,
                            description: description,
                            thumbnailurl: thumbnailurl,
                            title: title,
                            content_url: url,
                            tags: tags
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
            <br />
            <label>Thumbnail:</label>
            <input
                type="file"
                onChange={handleThumbnailFileChange}
                required
            />
            <br />
            <label>Tags:(add commas between each tags)</label>
            <input
                type="text"
                value={tags}
                onChange={(e) => {
                    setTags(e.target.value.split(','));
                }}
                required
            />
            <br />
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
        </div >

    );
};

export default VideoUploadPage;
