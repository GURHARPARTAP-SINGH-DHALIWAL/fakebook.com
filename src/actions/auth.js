import { API_Urls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { AUTHENTICATE_USER, CLEAR_AUTH_STATE, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT_USER } from "./actionTypes";
import {
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "../actions/actionTypes";

export function startLogin()
{
    return {
        type:LOGIN_START
    }
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error:error 
  }; 
}


export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}


export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error: error,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}


export function login(email,password){
    return (dispatch)=>{
        dispatch(startLogin());
        const url=API_Urls.login();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/x-www-form-urlencoded',
            },
            body:getFormBody({email,password}),
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);

            if(data.success)
            {
                localStorage.setItem('token',data.data.token);
                dispatch(loginSuccess(data.data.user));
            }
            else{
                dispatch(loginFailed(data.message));
            }
          
        })
        
        ;
    }
}


export function signup(name,email,password,confirmPassword)
{
    return (dispatch)=>{
        dispatch(startSignup());
        const url=API_Urls.signup();

                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                  },
                  body: getFormBody({ name
                    ,email,
                     password,
                     confirm_password:confirmPassword }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);

                    if (data.succes) {
                      dispatch(signupSuccess(data.data.user));
                    } else {
                      dispatch(signupFailed(data.message));
                    }
                  });
        
    };
}

export function authenticateUser(user){
  return {
    type:AUTHENTICATE_USER,
    user:user
  };
};

export function logoutUser(){
  return {
    type: LOGOUT_USER
  };
};


export function clearAuthState(){
  return {
    type:CLEAR_AUTH_STATE
  };
};