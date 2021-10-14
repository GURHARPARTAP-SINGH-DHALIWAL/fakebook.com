import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from "../actions/actionTypes";

const initialAuthState={
    user:{},
    error:null,
    isLoggedin:false,
    inProgess:false
};

export function auth(state=initialAuthState,action)
{
    switch (action.type){
        case LOGIN_START:
            return {
                ... state,
                inProgess:true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                error:null,
                user:action.user,
                inProgess:false,
                isLoggedin:true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                inProgess:false,
                error:action.error 
            }
    }
}