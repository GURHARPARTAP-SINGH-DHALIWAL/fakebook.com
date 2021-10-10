import React from "react";
import PropTypes from 'prop-types';

class PostList extends React.Component {
    render() { 
        const {posts}=this.props;
        return (
            <div className="posts-list">
            {
              posts.map((post)=>{
                return (
                  <div className="post-wrapper" key={post._id}>
                     <div className="post-header">
                          <div className="post-avatar">
                                  <img src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg" alt="" />
                                  <div>
                                        <span className="post-author">
                                          {post.user.name}
                                        </span>

                                        <span className="post-time">
                                            few seconds ago
                                        </span>
                                </div>
                          </div>


                         

                     
                     </div>



                    <div className="post-content">
                        {post.content}
                    </div>

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
                        <input type="text" placeholder="Start typing a comment" />
                    </div>

                    <div className="post-comments-list">
                        <div className="post-comments-item">
                              <div className="post-comment-header">
                                  <span className="post-comment-author">GSD</span>
                                  <span className="post-comment-time">a minute ago</span>
                                  <span className="post-comment-likes">100</span>
                              </div>

                              <div className="post-comment-content">
                                    Hey nice post 
                              </div>

                        </div>
                    </div>


                  </div>
                )
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