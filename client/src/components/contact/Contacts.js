import React, { useContext, Fragment } from 'react';

import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  // Initialize ContactContext
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return (
      <Fragment>
        <h4>Please add contacts</h4>
      </Fragment>
    );
  }

  const renderContacts = () => {
    if (filtered) {
      return filtered.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ));
    } else {
      return contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ));
    }
  };

  return <Fragment>{renderContacts()}</Fragment>;
};

export default Contacts;
