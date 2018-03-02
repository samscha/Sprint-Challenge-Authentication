import axios from 'axios';
import { appKey } from '../config';

axios.defaults.withCredentials = true;

const SERVER_ROOT = 'http://localhost:5000/api';

export const LOGGING_IN_START = 'LOGGING_IN_START';
export const LOGGING_IN_FINISH = 'LOGGING_IN_FINISH';

export const AUTH_USER_UNAUTHENTICATED = 'AUTH_USER_UNAUTHENTICATED';
export const AUTH_USER_AUTHENTICATED = 'AUTH_USER_AUTHENTICATED';
export const AUTH_USER_ERROR = 'AUTH_USER_ERROR';

export const authenticationErr = error => {
  return {
    type: AUTH_USER_ERROR,
    payload: error,
  };
};

export const login = (username, password, history) => {
  return dispatch => {
    dispatch({ type: LOGGING_IN_START });

    axios
      .post(`${SERVER_ROOT}/login`, { username, password })
      .then(({ data }) => {
        localStorage.setItem(appKey, data.token);
        dispatch({ type: AUTH_USER_AUTHENTICATED });
        dispatch({ type: LOGGING_IN_FINISH });
        history.push('/');
      })
      .catch(err => {
        dispatch(authenticationErr(err));
        dispatch({ type: LOGGING_IN_FINISH });
      });
  };
};
