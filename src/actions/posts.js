import { API_Urls } from "../helpers/urls";
import { getAuthorisationTokenFromLocalStorage, getFormBody } from "../helpers/utils";
import { ADD_COMMENT, ADD_POST, START_POST_FETCH, TOGGLE_LIKE, UPDATE_POSTS } from "./actionTypes";



export function startPostFetch(){
    return {
        type:START_POST_FETCH
    };
};


export function fetchPosts(){
    return (dispatch)=>{
        const url=API_Urls.fetchPosts();
        dispatch(startPostFetch());

        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log("Passed ",data);
            dispatch(updatePosts(data.data.posts));
        })
        .catch(err=>{
             const data=[1,2,3];
            dispatch(updatePosts([]));
            console.log("Error in Fetching Posts-->",err);
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



export function createComment(content,postId){

    return (dispatch)=>{
        const url=API_Urls.addComment();
        fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
          },
          body: getFormBody({ content ,post_id:postId}),
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                dispatch(addComment(data.data.comment,postId));
            }
        })
        .catch(err=>console.log(err))
        ;
    };



};



export function updatePosts(data){
    return {
        type:UPDATE_POSTS,
        posts:data
    }
};

export function addComment(comment,postId){
    return {
        type:ADD_COMMENT,
        comment,
        postId
    };
};

export function togglePostLikeStore(id,userId){
    return {
        type:TOGGLE_LIKE,
        id,
        userId
    };

};


export function toggleLike(id,toggleType,userId){
    return (dispatch)=>{

        // User Id Server will receive from authoridation headers
        const url=API_Urls.toggleLike(id,toggleType);
        console.log("Like Url--->",url);
        fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
          },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log("Like Data",data);
            if(data.success)
            {
                if(toggleType=='Post')
                {
                    dispatch(togglePostLikeStore(id,userId));
                }
              
            }
        })
        .catch(err=>console.log(err))
        ;
    };
}