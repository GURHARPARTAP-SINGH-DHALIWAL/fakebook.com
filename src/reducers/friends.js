import { ADD_FRIEND, FETCH_FRIENDS_SUCCESS, REMOVE_FRIEND } from "../actions/actionTypes";



// Array of users
const initialState=[];

export function friends(state=initialState,action){
    switch(action.type){
        case FETCH_FRIENDS_SUCCESS:
            return  [...action.friends];  
        case ADD_FRIEND:
            return state.concat(action.friendShip);
        case REMOVE_FRIEND:
            const newState=state.filter(friend=>friend.to_user._id!=action.userId);
            return newState;     
        default:
            return state

    };
};