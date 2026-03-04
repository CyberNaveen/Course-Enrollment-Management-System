import { useState } from 'react';
import './Dashboard.css';

function ManageCourses() {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Computer Science Engineering', seats: 60, cutoff: 195, duration: '4 years', filled: 45 },
        { id: 2, name: 'Electronics Engineering', seats: 45, cutoff: 185, duration: '4 years', filled: 30 },
        { id: 3, name: 'Mechanical Engineering', seats: 50, cutoff: 175, duration: '4 years', filled: 35 },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: '',
        seats: '',
        cutoff: '',
        duration: '4 years'
    });

    const handleAddCourse = (e) => {
        e.preventDefault();
        const course = {
            id: courses.length + 1,
            ...newCourse,
            seats: parseInt(newCourse.seats),
            cutoff: parseInt(newCourse.cutoff),
            filled: 0
        };
        setCourses([...courses, course]);
        setShowForm(false);
        setNewCourse({ name: '', seats: '', cutoff: '', duration: '4 years' });
    };

    return (
        <div className="manage-courses">
            <div className="header-actions">
                <h1>Manage Courses</h1>
                <button onClick={() => setShowForm(!showForm)} className="add-btn">
                    {showForm ? 'Cancel' : '+ Add New Course'}
                </button>
            </div>

            {showForm && (
                <div className="add-course-form">
                    <h2>Add New Course</h2>
                    <form onSubmit={handleAddCourse}>
                        <input
                            type="text"
                            placeholder="Course Name"
                            value={newCourse.name}
                            onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Total Seats"
                            value={newCourse.seats}
                            onChange={(e) => setNewCourse({...newCourse, seats: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Required Cutoff"
                            value={newCourse.cutoff}
                            onChange={(e) => setNewCourse({...newCourse, cutoff: e.target.value})}
                            required
                        />
                        <select
                            value={newCourse.duration}
                            onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                        >
                            <option value="3 years">3 years</option>
                            <option value="4 years">4 years</option>
                            <option value="5 years">5 years</option>
                        </select>
                        <button type="submit">Add Course</button>
                    </form>
                </div>
            )}

            <div className="courses-table">
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Duration</th>
                            <th>Total Seats</th>
                            <th>Filled</th>
                            <th>Available</th>
                            <th>Required Cutoff</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.duration}</td>
                                <td>{course.seats}</td>
                                <td>{course.filled}</td>
                                <td>{course.seats - course.filled}</td>
                                <td>{course.cutoff}</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageCourses;
