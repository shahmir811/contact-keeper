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

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
        error: null
      }; // ...payload will store token

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload
      };

    case USER_LOADED:
      return { ...state, user: payload, loading: false, isAuthenticated: true };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
