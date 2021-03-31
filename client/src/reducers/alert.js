
import {SET_ALERT,REMOVE_ALERT} from '../action/types'

const initalStage=[];
export default function alert(state=initalStage, action)
{
    const {payload,type}=action;    
    switch(type)
    {
    case SET_ALERT:
        return [...state,payload];
    case REMOVE_ALERT:
        return state.filter(alert => alert.id !== payload);
    default:
        return state;
        }
}