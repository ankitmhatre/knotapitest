import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utilties/axiosbase';
import './EditContact.css'; // Import the CSS file for styling
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = () => {
    const { id } = useParams(); // Get the id from the URL
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // Manage loading state
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (id) {
            // Fetch the contact details if id is provided
            const fetchContact = async () => {
                setLoading(true);
                try {
                    const response = await axiosInstance.get(`/api/contacts/${id}`);
              
                    const contact = response.data.contact;
                    setHistory(response.data.history);
                    setFirstName(contact.first_name);
                    setLastName(contact.last_name);
                    setPhone(contact.phone);
                    setEmail(contact.email);
                } catch (error) {
                    console.error(error);
                    setError('Failed to fetch contact details.');
                } finally {
                    setLoading(false);
                }
            };

            fetchContact();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            
                // Update contact
                const response = await axiosInstance.put(
                    `/api/contacts/${id}`,
                    {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        phone: phone,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );


                if(response.data.status==='success'){
                    setSuccess('Contact updated successfully!');
                    setLoading(false)
                    setError('');
                    navigate('/');
                }else{
                    setLoading(false)
                }
                 // Navigate back to the contacts list
        } catch (error) {
            setSuccess('');
            setError('An error occurred. Please try again.');
            console.error(error);
            setLoading(false)
        }
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit Contact' : 'Create Contact'}</h1>
            {loading ? (
                <div className="spinner"></div> // Show spinner while loading
            ) : (
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {id ? 'Update' : 'Submit'}
                    </button>
                </form>
            )}
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}



            {
                !loading && <div className="history-section">
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
            }
        </div>
    );
};

export default EditContact;
