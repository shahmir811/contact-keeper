import React, { useContext, useEffect } from 'react';
import ContactForm from '../contact/ContactForm';
import Contacts from '../contact/Contacts';
import ContactFilter from '../contact/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  // Initialize
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
