import { UPDATE_POSTS } from "./actionTypes";

export function fetchPosts(){
    return (dispatch)=>{
        const url='http://localhost:8000/api/v1/posts';

        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch(updatePosts(data));
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