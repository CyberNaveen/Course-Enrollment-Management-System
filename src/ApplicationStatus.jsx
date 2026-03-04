import { useState, useEffect } from 'react';
import './Dashboard.css';

function ApplicationStatus({ user }) {
    const [applications, setApplications] = useState(user?.appliedCourses || []);
    const [applicationsWithStatus, setApplicationsWithStatus] = useState([]);

    useEffect(() => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const allApplications = allUsers.flatMap(u => 
            (u.appliedCourses || []).map(app => ({
                ...app,
                studentName: u.fullName,
                studentId: u.id,
                studentCutoff: u.cutoff
            }))
        );

        const userApps = applications.map(app => {
            const adminResponse = JSON.parse(localStorage.getItem(`application_${app.id}`) || 'null');
            if (adminResponse) {
                return { ...app, status: adminResponse.status, remarks: adminResponse.remarks };
            }
            return app;
        });

        setApplicationsWithStatus(userApps);
    }, [applications]);

    const getStatusBadge = (status) => {
        const statusMap = {
            'applied': { text: 'Application Submitted', class: 'applied' },
            'under-review': { text: 'Under Review', class: 'under-review' },
            'approved': { text: 'Approved - Eligible', class: 'approved' },
            'rejected': { text: 'Not Eligible - Management Quota Available', class: 'rejected' }
        };
        
        const statusInfo = statusMap[status] || statusMap['applied'];
        return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
    };

    return (
        <div className="status-content">
            <h1>Application Status</h1>
            
            <div className="status-summary">
                <div className="summary-card">
                    <h3>Total Applications</h3>
                    <p className="summary-number">{applicationsWithStatus.length}</p>
                </div>
                <div className="summary-card">
                    <h3>Under Review</h3>
                    <p className="summary-number">
                        {applicationsWithStatus.filter(a => a.status === 'applied' || a.status === 'under-review').length}
                    </p>
                </div>
                <div className="summary-card">
                    <h3>Approved</h3>
                    <p className="summary-number">
                        {applicationsWithStatus.filter(a => a.status === 'approved').length}
                    </p>
                </div>
            </div>

            <div className="applications-list">
                <h2>Your Applications</h2>
                {applicationsWithStatus.length === 0 ? (
                    <p className="no-applications">You haven't applied to any courses yet.</p>
                ) : (
                    <table className="status-table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Applied Date</th>
                                <th>Your Cutoff</th>
                                <th>Required Cutoff</th>
                                <th>Status</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicationsWithStatus.map(app => (
                                <tr key={app.id}>
                                    <td>{app.courseName}</td>
                                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                                    <td>{app.studentCutoff}</td>
                                    <td>{app.requiredCutoff}</td>
                                    <td>{getStatusBadge(app.status || 'applied')}</td>
                                    <td>{app.remarks || 'Awaiting review'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="info-section">
                <h3>Application Process</h3>
                <ol>
                    <li>Submit your application for desired courses</li>
                    <li>Upload required documents for verification</li>
                    <li> Admin reviews your application and documents</li>
                    <li>If eligible, you'll receive approval for merit seat</li>
                    <li>If not eligible, management quota option will be available</li>
                </ol>
            </div>
        </div>
    );
}

export default ApplicationStatus;