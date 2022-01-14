import { ADD_COMMENT, ADD_POST, TOGGLE_LIKE, UPDATE_POSTS } from "../actions/actionTypes";

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
            return newPosts;

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