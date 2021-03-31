import {v4 as uuid} from 'uuid';
import {SET_ALERT,REMOVE_ALERT} from './types';

export const setAlert = (msg,alertType) => dispatch => {
    console.log("action callled")
    const id = uuid();
    dispatch({
        type:SET_ALERT,
        payload:{msg,alertType,id}
    })
    setTimeout(() => {
        dispatch(removeAlert(id))
    }, 5000);
}

export const removeAlert = (id) => {    
        return {
        type:REMOVE_ALERT,
        payload:id
    }   
}


