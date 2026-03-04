import { useState } from 'react';
import './Dashboard.css';

function Courses({ user, setUser }) {
    const [courses] = useState([
        { id: 1, name: 'Computer Science Engineering', seats: 60, cutoff: 185, duration: '4 years', fee: 85000 },
        { id: 2, name: 'Electronics Engineering', seats: 45, cutoff: 170, duration: '4 years', fee: 75000 },
        { id: 3, name: 'Mechanical Engineering', seats: 50, cutoff: 165, duration: '4 years', fee: 70000 },
        { id: 4, name: 'Civil Engineering', seats: 40, cutoff: 160, duration: '4 years', fee: 65000 },
        { id: 5, name: 'Electrical Engineering', seats: 45, cutoff: 168, duration: '4 years', fee: 72000 },
        { id: 6, name: 'Information Technology', seats: 55, cutoff: 180, duration: '4 years', fee: 80000 },
    ]);

    const [appliedCourses, setAppliedCourses] = useState(user?.appliedCourses || []);

    const handleApply = (course) => {
        if (!user.cutoff) {
            alert('Please enter your cutoff marks first');
            return;
        }

        if (user.cutoff < course.cutoff) {
            alert(`Your cutoff (${user.cutoff}) is less than the required cutoff (${course.cutoff}) for ${course.name}. You may only be eligible for management quota.`);
        }

        const application = {
            id: Date.now(),
            courseId: course.id,
            courseName: course.name,
            appliedDate: new Date().toISOString(),
            status: 'applied',
            studentCutoff: user.cutoff,
            requiredCutoff: course.cutoff,
            documents: user.documents || []
        };

        const updatedAppliedCourses = [...appliedCourses, application];
        setAppliedCourses(updatedAppliedCourses);

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex !== -1) {
            users[userIndex].appliedCourses = updatedAppliedCourses;
            localStorage.setItem('users', JSON.stringify(users));
            
            const updatedUser = { ...user, appliedCourses: updatedAppliedCourses };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }

        alert(`Applied to ${course.name} successfully!`);
    };

    const isApplied = (courseId) => {
        return appliedCourses.some(app => app.courseId === courseId);
    };

    return (
        <div className="courses-content">
            <h1>Available Courses</h1>
            {!user.cutoff && (
                <div className="warning-message">
                    Please enter your cutoff marks before applying to courses
                </div>
            )}
            <div className="courses-grid">
                {courses.map(course => {
                    const applied = isApplied(course.id);
                    const isEligible = user.cutoff && user.cutoff >= course.cutoff;
                    
                    return (
                        <div key={course.id} className="course-card">
                            <h3>{course.name}</h3>
                            <div className="course-details">
                                <p><strong>Duration:</strong> {course.duration}</p>
                                <p><strong>Total Seats:</strong> {course.seats}</p>
                                <p><strong>Required Cutoff:</strong> {course.cutoff}</p>
                                <p><strong>Annual Fee:</strong> ₹{course.fee.toLocaleString()}</p>
                                {user.cutoff && (
                                    <p className={isEligible ? 'eligible-text' : 'not-eligible-text'}>
                                        <strong>Your Eligibility:</strong> {isEligible ? 'Merit Quota' : 'Management Quota Only'}
                                    </p>
                                )}
                            </div>
                            <button 
                                onClick={() => handleApply(course)}
                                disabled={applied}
                                className={applied ? 'applied' : ''}
                            >
                                {applied ? '✓ Applied' : 'Apply Now'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Courses;