import { ADD_POST, UPDATE_POSTS } from "../actions/actionTypes";

// we are having array in object to make it scalable
const initialPostState={
    posts:[],
};

export function posts(state=[],action)
{   

    switch(action.type){
        case UPDATE_POSTS:
            return action.posts;
        case ADD_POST:
            return [action.post,...state];
            
            
        default:
            return state;
    }
    
}