import { useState } from 'react';
import './Dashboard.css';

function CutoffEntry({ user, setUser }) {
    const [marks, setMarks] = useState({
        maths: '',
        physics: '',
        chemistry: ''
    });
    const [calculatedCutoff, setCalculatedCutoff] = useState(user?.cutoff || null);

    const handleChange = (e) => {
        setMarks({ ...marks, [e.target.name]: e.target.value });
    };

    const calculateCutoff = (e) => {
        e.preventDefault();
        
        const maths = parseFloat(marks.maths) || 0;
        const physics = parseFloat(marks.physics) || 0;
        const chemistry = parseFloat(marks.chemistry) || 0;
        
        if (maths > 100 || physics > 100 || chemistry > 100) {
            alert('Marks cannot exceed 100 in any subject');
            return;
        }
        
        const total = maths + (physics / 2) + (chemistry / 2);
        const finalCutoff = Math.round(total * 100) / 100; 
        
        setCalculatedCutoff(finalCutoff);
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex !== -1) {
            users[userIndex].cutoff = finalCutoff;
            localStorage.setItem('users', JSON.stringify(users));
            
            const updatedUser = { ...user, cutoff: finalCutoff };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    };

    return (
        <div className="cutoff-content">
            <h1>Enter Your Marks</h1>
            <div className="cutoff-form-container">
                <form onSubmit={calculateCutoff} className="cutoff-form">
                    <div className="form-group">
                        <label>Mathematics (out of 100)</label>
                        <input
                            type="number"
                            name="maths"
                            value={marks.maths}
                            onChange={handleChange}
                            max="100"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Physics (out of 100)</label>
                        <input
                            type="number"
                            name="physics"
                            value={marks.physics}
                            onChange={handleChange}
                            max="100"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Chemistry (out of 100)</label>
                        <input
                            type="number"
                            name="chemistry"
                            value={marks.chemistry}
                            onChange={handleChange}
                            max="100"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <button type="submit">Calculate Cutoff</button>
                </form>

                {calculatedCutoff && (
                    <div className="cutoff-result">
                        <h2>Your Calculated Cutoff</h2>
                        <p className="cutoff-score">{calculatedCutoff}/200</p>
                        <p>Formula: Mathematics + (Physics/2) + (Chemistry/2)</p>
                        <p>Mathematics: {marks.maths || 0} + Physics/2: {((marks.physics || 0)/2).toFixed(2)} + Chemistry/2: {((marks.chemistry || 0)/2).toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CutoffEntry;