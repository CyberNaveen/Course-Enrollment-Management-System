import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import StudentHome from './StudentHome.jsx';
import Courses from './Courses.jsx';
import CutoffEntry from './CutoffEntry.jsx';
import ApplicationStatus from './ApplicationStatus.jsx';
import DocumentUpload from './DocumentUpload.jsx';

function StudentDashboard({ user, setUser }) {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('home');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2>Student Portal</h2>
                        <p>Welcome, {user?.name}!</p>
                    </div>
                    <nav>
                        <Link to="/student" onClick={() => setActivePage('home')} className={activePage === 'home' ? 'active' : ''}>Home</Link>
                        <Link to="/student/courses" onClick={() => setActivePage('courses')} className={activePage === 'courses' ? 'active' : ''}>Available Courses</Link>
                        <Link to="/student/cutoff" onClick={() => setActivePage('cutoff')} className={activePage === 'cutoff' ? 'active' : ''}>Enter Cutoff</Link>
                        <Link to="/student/documents" onClick={() => setActivePage('documents')} className={activePage === 'documents' ? 'active' : ''}>Upload Documents</Link>
                        <Link to="/student/status" onClick={() => setActivePage('status')} className={activePage === 'status' ? 'active' : ''}>Application Status</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </nav>
                </div>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<StudentHome user={user} />} />
                        <Route path="/courses" element={<Courses user={user} setUser={setUser} />} />
                        <Route path="/cutoff" element={<CutoffEntry user={user} setUser={setUser} />} />
                        <Route path="/documents" element={<DocumentUpload user={user} setUser={setUser} />} />
                        <Route path="/status" element={<ApplicationStatus user={user} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;