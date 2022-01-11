import { AUTHENTICATE_USER, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT_USER } from "../actions/actionTypes";
import { SIGNUP_FAILED,SIGNUP_START,SIGNUP_SUCCESS } from "../actions/actionTypes";

const initialAuthState={
    user:{},
    error:null,
    isLoggedin:false,
    inProgress:false
};

export function auth(state=initialAuthState,action)
{
    switch (action.type) {
      case LOGIN_START:
        return {
          ...state,
          inProgress: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          error: null,
          user: action.user,
          inProgress: false,
          isLoggedin: true,
        };
      case LOGIN_FAILED:
        return {
          ...state,
          inProgress: false,
          error: action.error,
        };
      case SIGNUP_START:
        return {
          ...state,
          inProgress: true,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          error: null,
          user: action.user,
          inProgress: false,
          isLoggedin: true,
        };
      case SIGNUP_FAILED:
        return {
          ...state,
          inProgress: false,
          error: action.error,
        };
      case AUTHENTICATE_USER:
        return {
          ...state,
          user:action.user,
          isLoggedin:true
        };
      case LOGOUT_USER:
        return {
          ...state,
          user:{},
          isLoggedin:false
        };
      default:
        return state;
    }
}