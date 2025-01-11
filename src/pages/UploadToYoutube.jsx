import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// YouTube API and OAuth credentials
const CLIENT_ID = '1048396286105-th2sno1bovtm9mv3983qtv0989r8f4u7.apps.googleusercontent.com';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const API_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=media';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Handle Google OAuth login
  const handleLogin = (response) => {
    const accessToken = response.credential;
    setIsAuthenticated(true);
    localStorage.setItem('accessToken', accessToken); // Store the token
  };

  // Handle Google OAuth logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken'); // Remove the token
  };

  // Handle file input change (video selection)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle video upload to YouTube
  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a video file.');
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setStatus('Please login to upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('snippet.title', 'Video Title');
    formData.append('snippet.description', 'Video Description');
    formData.append('snippet.tags', 'tag1, tag2');
    formData.append('status.privacyStatus', 'public');

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setVideoId(response.data.id);
      setStatus('Video uploaded successfully.');
    } catch (error) {
      console.error('Error uploading video:', error);
      setStatus('Failed to upload video.');
    }
  };

  return (
    <div>
      <h1>YouTube Video Upload</h1>

      {!isAuthenticated ? (
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => setStatus('Failed to authenticate.')}
          clientId={CLIENT_ID}
        />
      ) : (
        <GoogleLogout onLogoutSuccess={handleLogout} clientId={CLIENT_ID} />
      )}

      {isAuthenticated && (
        <>
          <h2>Upload a Video</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </>
      )}

      <p>{status}</p>
      {videoId && <p>Video uploaded successfully. Video ID: {videoId}</p>}
    </div>
  );
}

export default App;
