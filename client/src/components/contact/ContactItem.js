import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  // Initialize
  const contactContext = useContext(ContactContext);

  const {
    setCurrentContact,
    deleteContact,
    clearCurrentContact
  } = contactContext;

  const { id, name, email, phone, type } = contact;

  const deleteThisContact = id => {
    deleteContact(id);
    clearCurrentContact();
  };

  const editThisContact = () => {
    setCurrentContact(contact);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-danger')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelop-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <button className='btn btn-dark btn-sm' onClick={() => editThisContact()}>
        Edit
      </button>
      <button
        className='btn btn-danger btn-sm'
        onClick={() => deleteThisContact(id)}
      >
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
