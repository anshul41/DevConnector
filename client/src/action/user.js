import axios from 'axios';
import {
  ADD_EXPERIENCE,
  GET_PROFILE,
  AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const AddExperience = (newExperience) => async (dispatch) => {
    console.log("loaded",localStorage.token)
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  export const GetProfile = () => async (dispatch) => {
    console.log("loaded",localStorage.token)
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('http://localhost:5000/api/profile/me');
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
      
    }
  };