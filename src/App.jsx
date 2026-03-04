import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/student/*" 
          element={user?.role === 'student' ? <StudentDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/*" 
          element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App