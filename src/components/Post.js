import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createComment, createPost } from "../actions/posts";
import Comment from "./Comment";

class Post extends React.Component {
    constructor(props){
        super(props);
        this.state={
            content:''
        };
    };

    handleChange=(e)=>{
        this.setState({
            content:e.target.value
        });
    };

    handleKeyPress=(e)=>{
        if(e.key==='Enter'&&this.state.content.length>0)
        {
            this.props.dispatch(createComment(this.state.content,this.props.post._id));
              this.setState({
                content: "",
              });
        }
      
    };
    render() { 
        const post=this.props.post;
        return (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/user/${post.user._id}`}>
                  <img
                    src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                    alt=""
                  />
                </Link>
                <div>
                  <span className="post-author">
                    <Link to={`/user/${post.user._id}`}>{post.user.name}</Link>
                  </span>

                  <span className="post-time">few seconds ago</span>
                </div>
              </div>
            </div>

            <div className="post-content">{post.content}</div>

            <div className="post-actions">
              <div className="post-like">
                <i class="fas fa-thumbs-up"></i>
                <span>10</span>
              </div>

              <div className="post-comments-icon">
                <i class="far fa-comments"></i>
                <span>{post.comments.length}</span>
              </div>
            </div>
0
            <div className="post-comment-box">
              <input type="text" placeholder="Start typing a comment" value={this.state.content} onChange={(e)=>this.handleChange(e)} onKeyPress={(e)=>this.handleKeyPress(e)}/>
            </div>

            <div className="post-comments-list">
                    {
                        post.comments.map(comment=>{
                            return (
                                < Comment comment={comment} postId={post._id} key={comment._id} />
                            )
                        })
                    }
            </div>
          </div>
        );
    }
}

function  mapStateToProps(state){
  return {
    posts:state.posts
  }
};

export default connect()(Post);