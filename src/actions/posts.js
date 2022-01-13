import { API_Urls } from "../helpers/urls";
import { getAuthorisationTokenFromLocalStorage, getFormBody } from "../helpers/utils";
import { ADD_POST, UPDATE_POSTS } from "./actionTypes";

export function fetchPosts(){
    return (dispatch)=>{
        const url=API_Urls.fetchPosts();

        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log("Passed ",data);
            dispatch(updatePosts(data.data.posts));
        })
        .catch(err=>{
            const data=[1,2,3];
            dispatch(updatePosts(data));
        });
        ;
    };
}

export function addPost(post){
    return {
        type:ADD_POST,
        post
    };
};


export function createPost(content){
    return (dispatch)=>{
        const url=API_Urls.createPost();
        fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
          },
          body:getFormBody({content})
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success)
            {
                dispatch(addPost(data.data.post));
            }
         
        })
        .catch(err=>console.log(err));
    };
};

export function updatePosts(data){
    return {
        type:UPDATE_POSTS,
        posts:data
    }
}