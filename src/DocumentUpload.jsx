import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Dashboard.css';

function DocumentUpload({ user, setUser }) {
    const [documents, setDocuments] = useState(user?.documents || []);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        setUploading(true);
        
        setTimeout(() => {
            const newDocuments = acceptedFiles.map(file => ({
                id: Date.now() + Math.random(),
                name: file.name,
                type: file.type,
                size: file.size,
                uploadDate: new Date().toISOString(),
                status: 'pending',
                url: URL.createObjectURL(file)
            }));
            
            const updatedDocuments = [...documents, ...newDocuments];
            setDocuments(updatedDocuments);
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.id === user.id);
            
            if (userIndex !== -1) {
                users[userIndex].documents = updatedDocuments;
                localStorage.setItem('users', JSON.stringify(users));
                
                const updatedUser = { ...user, documents: updatedDocuments };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
            
            setUploading(false);
        }, 1500);
    }, [documents, user, setUser]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
            'application/pdf': ['.pdf']
        },
        maxSize: 5242880 // 5MB
    });

    const getDocumentIcon = (type) => {
        if (type.includes('pdf')) return '📄';
        if (type.includes('image')) return '🖼️';
        return '📁';
    };

    return (
        <div className="documents-content">
            <h1>Document Upload</h1>
            <p className="info-text">Upload your 12th mark sheet and other required documents (PDF or Images, max 5MB each)</p>
            
            <div className="documents-section">
                <div {...getRootProps()} className="upload-area">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop your files here...</p>
                    ) : (
                        <>
                            <p>Drag & drop files here, or click to select</p>
                            <p className="upload-hint">Supported: PDF, JPEG, PNG (Max 5MB)</p>
                        </>
                    )}
                </div>
                
                {uploading && (
                    <div className="uploading-indicator">
                        <p>Uploading...</p>
                    </div>
                )}
                
                {documents.length > 0 && (
                    <div className="documents-list">
                        <h3>Uploaded Documents</h3>
                        {documents.map(doc => (
                            <div key={doc.id} className="document-item">
                                <div className="document-info">
                                    <span className="document-icon">{getDocumentIcon(doc.type)}</span>
                                    <div className="document-details">
                                        <h4>{doc.name}</h4>
                                        <p>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className={`document-status status-${doc.status}`}>
                                    {doc.status === 'pending' && 'Pending Verification'}
                                    {doc.status === 'verified' && 'Verified'}
                                    {doc.status === 'rejected' && 'Rejected'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DocumentUpload;