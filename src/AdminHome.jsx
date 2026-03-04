import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function AdminHome() {
    return (
        <div className="home-content">
            <h1>Admin Dashboard</h1>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Students</h3>
                    <p className="stat-number">156</p>
                </div>
                <div className="stat-card">
                    <h3>Active Applications</h3>
                    <p className="stat-number">89</p>
                </div>
                <div className="stat-card">
                    <h3>Courses Offered</h3>
                    <p className="stat-number">12</p>
                </div>
                <div className="stat-card">
                    <h3>Seats Filled</h3>
                    <p className="stat-number">245/360</p>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <Link to="/admin/courses" className="action-btn">Add New Course</Link>
                    <Link to="/admin/applications" className="action-btn">Review Applications</Link>
                    <Link to="/admin/allocations" className="action-btn">Allocate Seats</Link>
                </div>
            </div>

            <div className="recent-activities">
                <h2>Recent Activities</h2>
                <ul>
                    <li>New application from John Doe for CSE</li>
                    <li>Cutoff entry deadline in 3 days</li>
                    <li>Seat allocation process initiated for 5 courses</li>
                    <li>12 new students registered today</li>
                </ul>
            </div>
        </div>
    );
}

export default AdminHome;
