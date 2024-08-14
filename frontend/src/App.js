// App.js
import React from 'react';
import ContactsList from './components/ContactsList';
import './App.css'
import ContactListHeader from './components/ContactListHeader';
const mockContacts = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+1-202-555-0171",
    address: {
      street: "123 Elm Street",
      city: "Springfield",
      state: "IL",
      postal_code: "62701",
      country: "USA"
    }
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone: "+1-202-555-0123",
    address: {
      street: "456 Oak Avenue",
      city: "Hometown",
      state: "CA",
      postal_code: "90210",
      country: "USA"
    }
  },
  {
    id: 3,
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael.johnson@example.com",
    phone: "+1-202-555-0199",
    address: {
      street: "789 Pine Road",
      city: "Metropolis",
      state: "NY",
      postal_code: "10001",
      country: "USA"
    }
  }
];

const App = () => {
  return (
    <div className="App">
    <header className="App-header">
      <div className="App-content">
        <h1>Contacts List</h1>
        <ContactsList contacts={mockContacts} />
      </div>
    </header>
  </div>
  );
};

export default App;
