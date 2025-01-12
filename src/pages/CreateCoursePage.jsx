import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CreateCoursePage() {

  const [username, setusername] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  const handleThumbnailFileChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!thumbnailFile || !title || !description) {
      setUploadStatus('Please fill in all fields and upload files.');
      return;
    }

    try {
      const thumbnailFileName = `${Date.now()}_thumb_${thumbnailFile.name}`;
      const session = await getSession();
      if (!session) {
        setErrorMessage("Please log in to create the course.");
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

      const { data: data, error: uploadError2 } = await supabase
        .storage
        .from("thumbnails") // Ensure this is the correct bucket name
        .upload(thumbnailFileName.replace(/\s+/g, ''), thumbnailFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError2) {
        console.error("Error during upload thumbanil:", uploadError2.message);
        setErrorMessage(`Error uploading thumbnail: ${uploadError2.message}`);
        setThumbnailUploading(false);
        return;
      }
      console.log("File uploaded successfully:", data);
      // Get the public URL of the uploaded photo
      const thumbnailurl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co/storage/v1/object/public/thumbnails/' + thumbnailFileName.replace(/\s+/g, '');
      console.log(thumbnailurl);
      if (!thumbnailurl) {
        console.error("Error fetching public URL:");
        setErrorMessage(`Error fetching photo URL: `);
      } else {
        var uid = uuidv4();
        // Step 3: Insert photo details into Supabase database
        const { data: insertData, error: insertError } = await supabase
          .from('courses')
          .insert([
            {
              uid: uid,
              uuid: session.user.id,
              title: title,
              description: description,
              thumbnailurl: thumbnailurl,
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
        console.log("Video uploaded successfully. Public URL:");
        setSuccessMessage("Video uploaded successfully!");
      }

      setUploadStatus('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadStatus('Error uploading video. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-blue-600 p-8 m-0 text-white">
        <h1 className="text-4xl  font-bold mb-6">Create a course</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-black">
          <input
            type="text"
            placeholder="Course Title"
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
            accept="image/*"
            onChange={handleThumbnailFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create course
          </button>
          {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
        </div>
      </div>
    </div>
  )
}
