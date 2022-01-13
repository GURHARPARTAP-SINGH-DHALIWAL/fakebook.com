import { FETCH_FRIENDS_SUCCESS } from "../actions/actionTypes";



// Array of users
const initialState=[];

export function friends(state=initialState,action){
    switch(action.type){
        case FETCH_FRIENDS_SUCCESS:
            return  [...action.friends];   
        default:
            return state

    };
};