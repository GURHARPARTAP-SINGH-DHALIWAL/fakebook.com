import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { connect } from "react-redux";

class PostList extends React.Component {
    render() { 

       if(this.props.posts.inProgress)
       {
        
            return (
              <div>
                <i class="fas fa-spinner" id="loader"></i>
              </div>
            );
         
       }

        const {posts}=this.props.posts;
        console.log("================?",posts);
        return (
          <div className="posts-list">
            <CreatePost />

            {posts.map((post) => {
              return <Post post={post} />;
            })}

            {posts.length === 0 && <h1>No Posts to Show</h1>}
          </div>
        );
    }
}
 
// This gives warning on wromg props types


PostList.propTypes={
    posts:PropTypes.array.isRequired
}


export default PostList;