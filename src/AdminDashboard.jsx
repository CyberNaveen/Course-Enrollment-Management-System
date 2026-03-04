import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import AdminHome from './AdminHome.jsx';
import ManageCourses from './ManageCourses.jsx';
import StudentApplications from './StudentApplications.jsx';
import SeatAllocation from './SeatAllocation.jsx';
import UserManagement from './UserManagement.jsx';

function AdminDashboard({ user }) {
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
                        <h2>Admin Portal</h2>
                        <p>Welcome, {user?.name}!</p>
                    </div>
                    <nav>
                        <Link to="/admin" onClick={() => setActivePage('home')} className={activePage === 'home' ? 'active' : ''}>Dashboard</Link>
                        <Link to="/admin/courses" onClick={() => setActivePage('courses')} className={activePage === 'courses' ? 'active' : ''}>Manage Courses</Link>
                        <Link to="/admin/applications" onClick={() => setActivePage('applications')} className={activePage === 'applications' ? 'active' : ''}>Student Applications</Link>
                        <Link to="/admin/allocations" onClick={() => setActivePage('allocations')} className={activePage === 'allocations' ? 'active' : ''}>Seat Allocations</Link>
                        <Link to="/admin/users" onClick={() => setActivePage('users')} className={activePage === 'users' ? 'active' : ''}>User Management</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </nav>
                </div>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<AdminHome />} />
                        <Route path="/courses" element={<ManageCourses />} />
                        <Route path="/applications" element={<StudentApplications />} />
                        <Route path="/allocations" element={<SeatAllocation />} />
                        <Route path="/users" element={<UserManagement />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;