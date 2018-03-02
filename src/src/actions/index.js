import axios from 'axios';

export const login = (username, password, history) => {
  console.log(username);
  return dispatch => {
    dispatch({ type: 'login', payload: { username, password } });
    history.push('/');
  };
};
