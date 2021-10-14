import { UPDATE_POSTS } from "./actionTypes";

export function fetchPosts(){
    return (dispatch)=>{
        const url='http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5';

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

export function updatePosts(data){
    return {
        type:UPDATE_POSTS,
        posts:data
    }
}