// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Questionnaire from './components/Questionnaire';
import VideoPlayer from './components/VideoPlayer'; // Import the VideoPlayer component
import Login from './pages/auth/loginpage';
import UploadToYoutube from './pages/UploadToYoutube';

const App = () => {
    return (
        
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/video/:videoId" element={<VideoPlayer />} /> {/* Video player page */}
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<UploadToYoutube />} />
                <Route path="/onboarding" element={<Questionnaire />} />
            </Routes>
        
    );
};

export default App;


