// ContactCard.js
import React from 'react';

const ContactListHeader = () => {
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <div style={styles.attribute}>
          <strong>Name</strong>
        </div>
        <div style={styles.attribute}>
          <strong>Email</strong> 
        </div>
        <div style={styles.attribute}>
          <strong>Phone</strong> 
        </div>
       
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  attribute: {
    flex: '1 1 25%', // Each attribute takes up 25% of the width
    padding: '0 10px',
    boxSizing: 'border-box',
  }
};

export default ContactListHeader;
