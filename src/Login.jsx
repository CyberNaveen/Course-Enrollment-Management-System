import { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            const adminUser = { 
                id: 'admin1',
                username: 'admin', 
                role: 'admin', 
                name: 'Administrator',
                email: 'admin@college.edu'
            };
            localStorage.setItem('user', JSON.stringify(adminUser));
            setUser(adminUser);
            navigate('/admin');
        } else if (credentials.username && credentials.password) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(u => u.username === credentials.username && u.password === credentials.password);
            
            if (foundUser) {
                const studentUser = { 
                    id: foundUser.id,
                    username: foundUser.username, 
                    role: 'student', 
                    name: foundUser.fullName,
                    email: foundUser.email,
                    cutoff: foundUser.cutoff || null,
                    documents: foundUser.documents || [],
                    appliedCourses: foundUser.appliedCourses || []
                };
                localStorage.setItem('user', JSON.stringify(studentUser));
                setUser(studentUser);
                navigate('/student');
            } else {
                setError('Invalid username or password');
            }
        } else {
            setError('Please enter username and password');
        }
    };

    return (
        <div className="public-page">
            <div className={styles.container}>
                <h1>Course Enrollment System</h1>
                <h2>Login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text" 
                            name="username"
                            placeholder="Username" 
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>  
                    <div className={styles.links}>
                        <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
                        <Link to="/forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;