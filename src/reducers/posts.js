import { ADD_COMMENT, ADD_POST, TOGGLE_LIKE, UPDATE_POSTS,START_POST_FETCH } from "../actions/actionTypes";

// we are having array in object to make it scalable
const initialPostState={
    posts:[],
    inProgress:false
};

export function posts(state=initialPostState,action)
{   

    switch(action.type){
        case UPDATE_POSTS:
            return {
                inProgress:false,
                posts:action.posts
            };
        case START_POST_FETCH:
            return {
                ...state,
                inProgress:true
            }
        
        case ADD_POST:
            return {
                ...state,
              posts:  [action.post,...state]
            };
        case TOGGLE_LIKE:
            const newPosts=state.map(post=>{
                if(post._id===action.id){

                        const index=post.likes.indexOf(action.userId);
                        if(index==-1){
                        return {
                            ...post,
                            likes:[action.userId,...post.likes]
                        };
                        }
                        else
                        {
                            const newLikes=post.likes.filter(id=>id!=action.userId);
                            return {
                                ...post,
                                likes:newLikes
                            }
                        }
                }
                else
                return post;
            });
            return {
                ...state,
                posts:newPosts
            };

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
            return {
                ...state,
                posts:newPost
            };
            
            
        default:
            return state;
    }
    
}