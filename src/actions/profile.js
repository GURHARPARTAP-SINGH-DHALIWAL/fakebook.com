import { API_Urls } from "../helpers/urls";
import { getAuthorisationTokenFromLocalStorage } from "../helpers/utils";
import { FETCH_USER_PROFILE, USER_PROFILE_FAIL, USER_PROFILE_SUCCESS } from "./actionTypes";

export function startUserProfileFetch(){
    return {
        type:FETCH_USER_PROFILE,
    };
};


// this will have actions related to user profile
export function userProfileSuccess(user){
    return {
        type:USER_PROFILE_SUCCESS ,
        user
    };
};

export function userProfileFail(error){
    return {
        type:USER_PROFILE_FAIL,
        error
    };
};


export function  fetchUserProfile(userId){
    return (dispatch)=>{
        dispatch(startUserProfileFetch());

        const url=API_Urls.userProfile(userId);

        fetch(url, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
          },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log("User Profile", data);
            if(data.success)
            {
                dispatch(userProfileSuccess(data.data.user));
            }
            else{
                dispatch(userProfileFail(data.data.message));
            }
        }).catch(err=>console.log(err));
    };
};