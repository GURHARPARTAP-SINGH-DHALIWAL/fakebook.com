import React from "react";
import { Link } from "react-router-dom";


class Comment extends React.Component {

  
    render() { 
        console.log("Comment props>",this.props);
        const {comment}=this.props;
        console.log(comment);
        const date=new Date(comment.createdAt);
        const now = date.toLocaleString("en-US");
        


        return (
          <div className="post-comment-item">
            <div className="post-comment-header">
              <span className="post-comment-author">
                <Link to={`user/${comment.user._id}`}>{comment.user.name}</Link>
              </span>
              <span className="post-comment-time">{now}</span>
              <span className="post-comment-likes">{comment.likes.length}</span>
            </div>

            <div className="post-comment-content">{comment.content}</div>
          </div>
        );
    }
}
 
export default Comment;