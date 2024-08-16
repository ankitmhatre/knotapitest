import React, { useState } from 'react';
import axiosInstance from '../../utilties/axiosbase';
import './CreateContact.css'; // Import the CSS file for styling

const CreateContact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        };

        if (!firstName) {
            newErrors.firstName = 'First name is required.';
            isValid = false;
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required.';
            isValid = false;
        }

        if (!phone || !/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number must be 10 digits.';
            isValid = false;
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'A valid email is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post(
                'api/contacts/create',
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
            setFirstName('');
            setLastName('');
            setPhone('');
            setEmail('');
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Create Contact</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        className="input"
                    />
                    {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        className="input"
                    />
                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="input"
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        className="input"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {loading && <div className="spinner"></div>}
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CreateContact;
