import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utilties/axiosbase';
import ContactsList from '../../components/ContactsList';
import './AllContacts.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const AllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    const [deletingId, setDeletingId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axiosInstance.get('/api/contacts'); // Replace with your API endpoint
                setContacts(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchContacts();
    }, []);

const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
        setDeletingId(id); // Set the deleting state for the contact being deleted
        try {
            await axiosInstance.delete(`/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact.contact_id !== id));
        } catch (error) {
            console.error('Failed to delete contact:', error);
        } finally {
            setDeletingId(null); // Clear the deleting state
        }
    }
};

    return (
        <div className="contacts-container">
            <header className="contacts-header">
                <div className="header-content">
                    <h1>Contacts List</h1>
                    <button className="create-button" onClick={() => navigate('/create')}>
                        Create New Contact
                    </button>
                </div>
            </header>
            <div className="contacts-list-container">
                {loading ? (
                    <div className="spinner"></div> // Show spinner while loading
                ) : (
                    <ContactsList contacts={contacts} onDelete={handleDelete} deletingId={deletingId} />
                )}
            </div>
        </div>
    );
};

export default AllContacts;
