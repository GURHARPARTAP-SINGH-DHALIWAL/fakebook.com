import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createComment, createPost } from "../actions/posts";
import { getAuthorisationTokenFromLocalStorage } from "../helpers/utils";
import Comment from "./Comment";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      maxCount: 2,
    };
  }

  handleLoadMore = (e) => {
    e.preventDefault();
    const oldVal = this.state.maxCount;

    this.setState({
      maxCount: oldVal + 2,
    });
  };

  handleShowLess = (e) => {
    e.preventDefault();
    const oldVal = this.state.maxCount;
    const newVal=oldVal-2;
    if(newVal<2)
    newVal=2;

    this.setState({
      maxCount: newVal,
    });
  };
  handleChange = (e) => {
          const token = getAuthorisationTokenFromLocalStorage();
          if (token) {
            this.setState({
              content: e.target.value,
            });
          } else {
            this.setState({
              content: "Please Login to Add a comment",
            });
          }
    
  };

  handleKeyPress = (e) => {

    const token=getAuthorisationTokenFromLocalStorage();
    if(token){
    if (e.key === "Enter" && this.state.content.length > 0) {
      this.props.dispatch(
        createComment(this.state.content, this.props.post._id)
      );
      this.setState({
        content: "",
      });
    }
}
else
{
    this.setState({
        content:"Please Login to Add a comment"
    });
 
}
  };

  render() {
    const post = this.props.post;
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
        
        <div className="post-comment-box">
          <input
            type="text"
            placeholder="Start typing a comment"
            value={this.state.content}
            onChange={(e) => this.handleChange(e)}
            onKeyPress={(e) => this.handleKeyPress(e)}
          />
        </div>
        <div className="post-comments-list">
          {post.comments.map((comment, idx) => {
            if (idx + 1 <= this.state.maxCount) {
              return (
                <Comment
                  comment={comment}
                  postId={post._id}
                  key={comment._id}
                />
              );
            }
          })}

          {post.comments.length > this.state.maxCount && (
            <Link onClick={(e) => this.handleLoadMore(e)}>
              <span>Load More...</span>
            </Link>
          )}
            <br />
          {this.state.maxCount > 2 && (
            <Link onClick={(e) => this.handleShowLess(e)} id="showless">
              <span>Show Less...</span>
            </Link>
          )}
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