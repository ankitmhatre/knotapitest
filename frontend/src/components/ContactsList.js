// ContactsList.js
import React from 'react';
import ContactCard from './ContactCard';
import ContactListHeader from './ContactListHeader';

const ContactsList = ({ contacts , onDelete, deletingId}) => {
 

  return (
    <div style={styles.list} >

      {contacts.map(contact => (
  
        <ContactCard  contact={contact} onDelete={onDelete} deletingId={deletingId} />

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
