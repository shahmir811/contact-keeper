import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  // Initialize
  const contactContext = useContext(ContactContext);

  const {
    addNewContact,
    current,
    clearCurrentContact,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personel'
      });
    }
  }, [current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personel'
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const saveContact = e => {
    e.preventDefault();

    if (current === null) {
      addNewContact(contact);
    } else {
      updateContact(contact);
    }

    // clear input form
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personel'
    });
    clearCurrentContact();
  };

  const clearAll = () => {
    clearCurrentContact();
  };

  return (
    <form onSubmit={e => saveContact(e)}>
      <h2 className='text-primary'>{current ? 'Edit' : 'Add'} Contact</h2>
      <input
        type='text'
        name='name'
        value={name}
        placeholder='Name'
        onChange={e => onChange(e)}
      />
      <input
        type='text'
        name='email'
        value={email}
        placeholder='Email'
        onChange={e => onChange(e)}
      />
      <input
        type='text'
        name='phone'
        value={phone}
        placeholder='Phone'
        onChange={e => onChange(e)}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personel'
        checked={type === 'personel'}
        onChange={e => onChange(e)}
      />{' '}
      Personel
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={e => onChange(e)}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      <div>
        {current && (
          <button
            className='btn btn-light btn-block'
            onClick={() => clearAll()}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
