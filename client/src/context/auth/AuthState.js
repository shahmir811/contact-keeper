import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';
import SetAuthToken from '../../utils/SetAuthToken';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';
import { isArray } from 'util';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      SetAuthToken(token);
    }

    try {
      const response = await axios.get('/api/auth');

      dispatch({ type: USER_LOADED, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.msg });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const response = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data // response.data will have the token
      });

      loadUser(); // getCurrently logged in user
    } catch (err) {
      const { errors } = err.response.data;

      if (isArray(errors)) {
        errors.forEach(error =>
          dispatch({ type: REGISTER_FAIL, payload: error.msg })
        );
      }

      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const response = await axios.post('/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data // response.data will have the token
      });

      loadUser(); // getCurrently logged in user
    } catch (err) {
      const { errors } = err.response.data;

      if (isArray(errors)) {
        errors.forEach(error =>
          dispatch({ type: LOGIN_FAIL, payload: error.msg })
        );
      }

      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
