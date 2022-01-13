import { API_Urls } from "../helpers/urls";
import { getAuthorisationTokenFromLocalStorage, getFormBody } from "../helpers/utils";
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_USER,
} from "./actionTypes";
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

// These will be dispatched from thunk when it will call the async one


export function editUserSuccessful(user){
  return {
    type:EDIT_USER_SUCCESSFUL ,
    user
  };
};



export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
};




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



export function editUser(name,password,confirmPassword,userId){

  // return function as this will be async but dispatch works synchornlsy  so middleware will be executed and thunk will check if action is of type function then it will execute it and then again dispatch will be called
  return (dispatch)=>{
      const url=API_Urls.editProfile();

      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          "Authorization":`Bearer ${getAuthorisationTokenFromLocalStorage()}`
        },
        body:getFormBody({
          name,
          password,
          confirm_password:confirmPassword,
          id:userId
        }),
      })
      .then(res=>res.json())
      .then(data=>{
        console.log('data',data);

        if(data.success)
        {
          dispatch(editUserSuccessful(data.data.user));
          // Change token also as layload gets updated

          if (data.data.token) {
            localStorage.setItem("token", data.data.token);
          }
          return;
        }


        if(data.message)
        {
          dispatch(editUserFailed(data.message));
        }


      });


  };
};