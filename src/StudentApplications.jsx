import { useState, useEffect } from 'react';
import './Dashboard.css';

function StudentApplications() {
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = () => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const allApplications = allUsers.flatMap(user => 
            (user.appliedCourses || []).map(app => ({
                ...app,
                studentName: user.fullName,
                studentEmail: user.email,
                studentId: user.id,
                studentCutoff: user.cutoff,
                documents: user.documents || []
            }))
        );
        setApplications(allApplications);
    };

    const handleApprove = (application) => {
        const remarks = prompt('Enter approval remarks (optional):');
        const statusData = {
            status: 'approved',
            remarks: remarks || 'Application approved - Eligible for merit seat',
            approvedBy: 'Admin',
            approvedDate: new Date().toISOString()
        };
        
        localStorage.setItem(`application_${application.id}`, JSON.stringify(statusData));
        loadApplications();
    };

    const handleReject = (application) => {
        const remarks = prompt('Enter rejection remarks (suggest management quota):');
        const statusData = {
            status: 'rejected',
            remarks: remarks || 'Not eligible for merit seat - Management quota available',
            rejectedBy: 'Admin',
            rejectedDate: new Date().toISOString()
        };
        
        localStorage.setItem(`application_${application.id}`, JSON.stringify(statusData));
        loadApplications();
    };

    const handleStartReview = (application) => {
        const statusData = {
            status: 'under-review',
            remarks: 'Application under review',
            reviewedBy: 'Admin',
            reviewDate: new Date().toISOString()
        };
        
        localStorage.setItem(`application_${application.id}`, JSON.stringify(statusData));
        loadApplications();
    };

    const getApplicationStatus = (app) => {
        const adminResponse = JSON.parse(localStorage.getItem(`application_${app.id}`) || 'null');
        return adminResponse?.status || 'applied';
    };

    const filteredApplications = applications.filter(app => {
        const status = getApplicationStatus(app);
        if (filter !== 'all' && status !== filter) return false;
        if (search && !app.studentName.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="applications-content">
            <h1>Student Applications</h1>
            
            <div className="filters">
                <select 
                    className="filter-select" 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Applications</option>
                    <option value="applied">Applied</option>
                    <option value="under-review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <input 
                    type="search" 
                    placeholder="Search by student name..." 
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={loadApplications} className="refresh-btn">Refresh</button>
            </div>

            <table className="applications-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Cutoff</th>
                        <th>Required</th>
                        <th>Documents</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplications.map(app => {
                        const status = getApplicationStatus(app);
                        const adminResponse = JSON.parse(localStorage.getItem(`application_${app.id}`) || 'null');
                        
                        return (
                            <tr key={app.id}>
                                <td>
                                    <strong>{app.studentName}</strong>
                                    <br />
                                    <small>{app.studentEmail}</small>
                                </td>
                                <td>{app.courseName}</td>
                                <td>{app.studentCutoff}</td>
                                <td>{app.requiredCutoff}</td>
                                <td>
                                    <span className={`document-badge ${app.documents?.length > 0 ? 'has-docs' : 'no-docs'}`}>
                                        {app.documents?.length || 0} files
                                    </span>
                                </td>
                                <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge ${status}`}>
                                        {status}
                                    </span>
                                    {adminResponse?.remarks && (
                                        <small className="remarks">{adminResponse.remarks}</small>
                                    )}
                                </td>
                                <td>
                                    {status === 'applied' && (
                                        <button 
                                            onClick={() => handleStartReview(app)}
                                            className="review-btn"
                                        >
                                            Start Review
                                        </button>
                                    )}
                                    {status === 'under-review' && (
                                        <>
                                            <button 
                                                onClick={() => handleApprove(app)}
                                                className="approve-btn"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleReject(app)}
                                                className="reject-btn"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {app.documents?.length > 0 && (
                                        <button className="view-docs-btn">View Docs</button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StudentApplications;