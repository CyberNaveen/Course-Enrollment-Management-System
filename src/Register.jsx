import { useState } from 'react';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some(u => u.username === formData.username)) {
            setError('Username already exists');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            ...formData,
            role: 'student',
            cutoff: null,
            documents: [],
            appliedCourses: [],
            createdAt: new Date().toISOString()
        };
        
        delete newUser.confirmPassword;
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        const userForSession = {
            id: newUser.id,
            username: newUser.username,
            role: 'student',
            name: newUser.fullName,
            email: newUser.email,
            cutoff: null,
            documents: [],
            appliedCourses: []
        };
        localStorage.setItem('user', JSON.stringify(userForSession));
        
        navigate('/student');
    };

    return (
        <div className="public-page">
            <div className={styles.container}>
                <h1>Student Registration</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="fullName"
                        placeholder="Enter your full name" 
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your email id" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="number" 
                        name="mobile"
                        placeholder="Enter your mobile number" 
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Create your username" 
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Create your password" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm your password" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                    <span>Already have an account? <Link to="/">Login</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Register;