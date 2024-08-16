// ContactCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ContactCard.css'



const ContactCard = ({ contact , onDelete, deletingId}) => {
  const navigate = useNavigate();


  return (
    <div style={styles.card} >
      <div style={styles.content} onClick={()=>{
      navigate(`/contact/${contact.contact_id}`)
    }}>
        <div style={
            {...styles.attribute,  ...styles.contactName}
        }>
          {contact.first_name} {contact.last_name}
        </div>
        <div style={ {...styles.attribute,  ...styles.contactEmail}}>
{contact.email}
        </div>
        <div style={ {...styles.attribute,  ...styles.contactPhone}}>
{contact.phone}
        </div>
        
     

        {/* <div style={styles.attribute}>
          <strong>Address:</strong> {contact.address.street}, {contact.address.city}, {contact.address.state} {contact.address.postal_code}, {contact.address.country}
        </div> */}
      </div>
      <FontAwesomeIcon
                            icon={faTrash}
                            className="delete-icon"
                            onClick={() => onDelete(contact.contact_id)}
                        />
    </div>
  );
};

const styles = {
  card: {
    // border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
    justifyContent: 'left'
  },
  contactName: {
   //fontSize: '1.25em',
   fontWeight: 'bold',
  },
  contactPhone: {
   //fontSize: '1.25em',
color: '#ccc',
  },
  contactEmail: {
   //fontSize: '1.25em',
color: '#ccc',
  }
};

export default ContactCard;
