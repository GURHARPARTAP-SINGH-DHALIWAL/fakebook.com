import React from 'react';
import {connect} from 'react-redux';
import { fetchPosts } from '../actions/posts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchPosts());
  }
  render() { 
    console.log('PROPS',this.props);
     let posts=this.props.posts.posts;

     if(!posts)
     posts=[]; 
      

     console.log("posts Array",posts);
   
  
    return (
      <div>
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
      </div>
    );
  }
}
 
function mapStateToProps(state){
         return {
           posts:state.posts
         }
};


// So wgat this will do is it will poss our app
// by refernce and pass the data return from mapstatetoprops as props to this component when this will be rendered
// internlly it renders app component insise another component which is in socketcontext.consumer 
// if the othe compine t =have some constructor it si wrapped inside another wrapper
const connectedApp=connect(mapStateToProps)(App);

export default connectedApp;