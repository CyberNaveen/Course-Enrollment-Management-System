import { useState, useEffect } from 'react';
import './Dashboard.css';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        setUsers(allUsers);
    };

    const handleResetPassword = (userId) => {
        const newPassword = prompt('Enter new password for user:');
        if (!newPassword) return;

        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                return { ...user, password: newPassword };
            }
            return user;
        });

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setMessage('Password reset successfully!');
        
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="user-management-content">
            <h1>User Management</h1>
            
            {message && <div className="success-message">{message}</div>}
            
            <div className="user-management">
                <h2>Student Accounts</h2>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Registered Date</th>
                            <th>Documents</th>
                            <th>Applications</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.fullName}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>{(user.documents || []).length}</td>
                                <td>{(user.appliedCourses || []).length}</td>
                                <td>
                                    <button 
                                        onClick={() => handleResetPassword(user.id)}
                                        className="reset-password-btn"
                                    >
                                        Reset Password
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;