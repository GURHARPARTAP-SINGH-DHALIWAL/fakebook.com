import { API_Urls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";
import { LOGIN_START } from "./actionTypes";

export function startLogin()
{
    return {
        type:LOGIN_START
    }
}


export function login(email,password){
    return (dispatch)=>{
        const url=API_Urls.login();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/x-www-form-urlencoded',
            },
            body:getFormBody({email,password}),
        });
    }
}