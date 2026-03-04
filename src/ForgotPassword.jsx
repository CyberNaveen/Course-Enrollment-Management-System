import { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username);
        
        if (user) {
            setMessage(`Password reset request sent to admin for user: ${username}`);
        } else {
            setError('User not found');
        }
    };

    return (
        <div className="public-page">
            <div className={styles.container}>
                <h1>Reset Password</h1>
                <p className={styles.info}>Password reset can only be done by admin. Please contact admin or submit a request.</p>
                {error && <p className={styles.error}>{error}</p>}
                {message && <p className={styles.success}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Enter your username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button type="submit">Request Password Reset</button>
                    <span><Link to="/">Back to Login</Link></span>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;