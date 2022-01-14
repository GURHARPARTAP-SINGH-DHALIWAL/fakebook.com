import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { connect } from "react-redux";

class PostList extends React.Component {
    render() { 
        const {posts}=this.props;
        return (
            <div className="posts-list">
              <CreatePost />
              
            {
              posts.map((post)=>{
                return (
                    <Post post={post}/>
                );
              }
                
              )
            }
          </div>
        );
    }
}
 
// This gives warning on wromg props types


PostList.propTypes={
    posts:PropTypes.array.isRequired
}


export default PostList;