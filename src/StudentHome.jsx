import { Link } from 'react-router-dom';
import './Dashboard.css';

function StudentHome({ user }) {
    return (
        <div className="home-content">
            <h1>Welcome to Course Enrollment System</h1>
            <div className="info-cards">
                <div className="card">
                    <h3>Your Cutoff</h3>
                    <p className="cutoff-value">{user?.cutoff ? user.cutoff : 'Not entered yet'}</p>
                    <p>Enter your cutoff marks to check eligible courses</p>
                </div>
                <div className="card">
                    <h3>Available Courses</h3>
                    <p>Browse through our wide range of courses</p>
                    <Link to="/student/courses" className="card-link">View Courses →</Link>
                </div>
                <div className="card">
                    <h3>Application Status</h3>
                    <p>Check your application and seat allocation status</p>
                    <Link to="/student/status" className="card-link">Check Status →</Link>
                </div>
            </div>
            
            <div className="announcements">
                <h2>Announcements</h2>
                <ul>
                    <li>Cutoff entry deadline: March 30, 2026</li>
                    <li>Course registration opens: April 1, 2026</li>
                    <li>Merit list announcement: April 15, 2026</li>
                </ul>
            </div>
        </div>
    );
}

export default StudentHome;