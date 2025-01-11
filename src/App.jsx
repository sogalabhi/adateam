import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/loginpage';
import Register from './pages/auth/register';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;

