import { FETCH_USER_PROFILE, USER_PROFILE_FAIL, USER_PROFILE_SUCCESS } from "../actions/actionTypes";

// reducer is a type of pire function (not accessing outside data and all not changing it) gets  the old state retuns the new

const initialState={
    user:{},
    success:null,
    error:null,
    inProgress:false
};

export function profile(state=initialState,action){
    switch(action.type){
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                inProgress:false,
                success:true,
                user:action.user
            };
        case USER_PROFILE_FAIL:
            return {
                ...state,
                user:{},
                error:action.error,
                inProgress:false
            };
        case FETCH_USER_PROFILE:
            return {
                ...state,
                inProgress:true
            };
        default:
            return state;
    }
};