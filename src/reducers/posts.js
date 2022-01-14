import { ADD_COMMENT, ADD_POST, UPDATE_POSTS } from "../actions/actionTypes";

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

        case ADD_COMMENT:

            const newPost=state.map(post=>{
                if(post._id===action.postId)
                {
                    return {
                        
                            ...post,
                            comments  : [action.comment,...post.comments]
                        
                    }
                }
                else {
                    return post;
                }
            });
            return newPost;
            
            
        default:
            return state;
    }
    
}