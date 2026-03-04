import { useState } from 'react';
import './Dashboard.css';

function SeatAllocation() {
    const [allocations, setAllocations] = useState([
        { 
            id: 1, 
            student: 'John Doe', 
            course: 'Computer Science Engineering', 
            cutoff: 195, 
            meritRank: 1,
            status: 'allocated',
            type: 'merit'
        },
        { 
            id: 2, 
            student: 'Jane Smith', 
            course: 'Information Technology', 
            cutoff: 190, 
            meritRank: 2,
            status: 'allocated',
            type: 'merit'
        },
        { 
            id: 3, 
            student: 'Mike Johnson', 
            course: 'Mechanical Engineering', 
            cutoff: 175, 
            meritRank: 15,
            status: 'management',
            type: 'management'
        },
    ]);

    return (
        <div className="allocation-content">
            <h1>Seat Allocation</h1>
            
            <div className="allocation-stats">
                <div className="stat-box">
                    <h3>Merit Seats</h3>
                    <p className="stat-large">42/180</p>
                    <p>Filled</p>
                </div>
                <div className="stat-box">
                    <h3>Management Seats</h3>
                    <p className="stat-large">18/60</p>
                    <p>Filled</p>
                </div>
                <div className="stat-box">
                    <h3>Total Seats</h3>
                    <p className="stat-large">240</p>
                    <p>Available</p>
                </div>
            </div>

            <div className="allocation-controls">
                <h2>Automatic Merit-Based Allocation</h2>
                <p>Allocate seats based on cutoff marks and preferences</p>
                <button className="allocate-btn">Run Merit Allocation</button>
            </div>

            <div className="allocation-table-container">
                <h2>Current Allocations</h2>
                <table className="allocation-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Cutoff</th>
                            <th>Merit Rank</th>
                            <th>Allocation Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocations.map(all => (
                            <tr key={all.id}>
                                <td>{all.student}</td>
                                <td>{all.course}</td>
                                <td>{all.cutoff}</td>
                                <td>{all.meritRank}</td>
                                <td>
                                    <span className={`type-badge ${all.type}`}>
                                        {all.type === 'merit' ? ' Merit' : ' Management'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${all.status}`}>
                                        {all.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SeatAllocation;
