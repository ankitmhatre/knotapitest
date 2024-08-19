import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utilties/axiosbase';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ViewContact.css';

const ViewContact = () => {
    const { id } = useParams(); // Get the contact ID from the URL
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axiosInstance.get(`/api/contacts/${id}`);
                setContact(response.data.contact);
                setHistory(response.data.history);
            } catch (error) {
                console.error('Error fetching contact:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            setDeleting(true);
            try {
                await axiosInstance.delete(`/api/contacts/${id}`);
                navigate('/'); // Redirect to contacts list after deletion
            } catch (error) {
                console.error('Failed to delete contact:', error);
                setDeleting(false);
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`); // Navigate to the edit page
    };

    if (loading) {
        return <div className="spinner"></div>; // Show a loading spinner while data is being fetched
    }

    if (!contact) {
        return <div className="error-message">Contact not found.</div>;
    }

    return (
        <div className="view-contact-container">
            <h1>View Contact</h1>
            <div className="contact-details">
                <p><strong>First Name:</strong> {contact.first_name}</p>
                <p><strong>Last Name:</strong> {contact.last_name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
            </div>

                <h4>Actions:</h4>
                <button className="edit-button" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="delete-button" onClick={handleDelete} disabled={deleting}>
                    <FontAwesomeIcon icon={faTrash} /> {deleting ? 'Deleting...' : 'Delete'}
                </button>
           
            <br /><br />
            <button className="back-button" onClick={() => navigate('/')}>
                Back to Contacts
            </button>
            <br /><br />
            <div className="history-section">
                <h2>Change History</h2>
                {history.length > 0 ? (
                    history.map((record) => (
                        <div key={record.id} className="history-card">
                            <p><strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}</p>
                            <p><strong>Attribute Changed:</strong> {record.attribute_changed}</p>
                            <p><strong>Previous Value:</strong> {record.attribute_previous_value}</p>
                            <p><strong>Updated Value:</strong> {record.attribute_update_value}</p>
                        </div>
                    ))
                ) : (
                    <p>No history available.</p>
                )}
            </div>
        </div>
    );
    
};

export default ViewContact;
