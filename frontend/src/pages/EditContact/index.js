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

    useEffect(() => {
        if (id) {
            // Fetch the contact details if id is provided
            const fetchContact = async () => {
                setLoading(true);
                try {
                    const response = await axiosInstance.get(`/api/contacts/${id}`);
                    const contact = response.data;
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
        try {
            if (id) {
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
                setSuccess('Contact updated successfully!');
            } else {
                // Create new contact
                const response = await axiosInstance.post(
                    '/api/contacts/create',
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
                setSuccess('Contact created successfully!');
            }
            setError('');
            navigate('/contacts'); // Navigate back to the contacts list
        } catch (error) {
            setSuccess('');
            setError('An error occurred. Please try again.');
            console.error(error);
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
        </div>
    );
};

export default EditContact;
