// ContactsList.js
import React from 'react';
import ContactCard from './ContactCard';
import ContactListHeader from './ContactListHeader';

const ContactsList = ({ contacts }) => {
  return (
    <div style={styles.list}>

      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  }
};

export default ContactsList;
