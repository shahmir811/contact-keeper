import React, { useContext, useEffect, Fragment } from 'react';

import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  // Initialize ContactContext
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return (
      <Fragment>
        <h4>Please add contacts</h4>
      </Fragment>
    );
  }

  const renderContacts = () => {
    if (filtered) {
      return filtered.map(contact => (
        <ContactItem key={contact._id} contact={contact} />
      ));
    } else {
      return contacts.map(contact => (
        <ContactItem key={contact._id} contact={contact} />
      ));
    }
  };

  return (
    <Fragment>
      {contacts !== null && !loading ? renderContacts() : <Spinner />}
    </Fragment>
  );
};

export default Contacts;
