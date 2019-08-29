import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title }) => {
  // Initialize
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const renderLinks = () => {
    if (isAuthenticated) {
      return (
        <Fragment>
          <li>Hello, {user && user.name}</li>
          <li>
            <a href='#!' onClick={() => onLogout()}>
              <i className='fas fa-sign-out-alt'></i>{' '}
              <span className='hide-sm'> Logout</span>
            </a>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </Fragment>
      );
    }
  };

  return (
    <div className='navbar bg-primary'>
      <Link to='/'>
        <i className='fas fa-id-card-alt' /> {title}
      </Link>
      <ul>{renderLinks()}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: 'Contact Keeper'
};

export default Navbar;
