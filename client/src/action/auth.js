import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  console.log("loaded",localStorage.token)
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const registerUser = (newUser) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(newUser);
  try {
    const res = await axios.post(
      'http://localhost:5000/api/users/register',
      body,
      config
    );
    console.log(res);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token: res.data.token },
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data.errors);
    err.response.data.errors.forEach((err) =>
      dispatch(setAlert(err.msg, 'danger'))
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};




export const loginUser = (email,password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({email,password});
  try {
    const res = await axios.post(
      'http://localhost:5000/api/users/login',
      body,
      config
    );
    console.log(res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: res.data.token },
    });
    dispatch(loadUser());
    
  } catch (err) {
    console.log(err.response.data.errors);
    err.response.data.errors.forEach((err) =>
      dispatch(setAlert(err.msg, 'danger'))
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const logout = () => dispatch => {

  dispatch({
      type:LOGOUT      
  })
  
}