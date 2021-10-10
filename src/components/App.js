import React from 'react';
import {connect} from 'react-redux';
import { fetchPosts } from '../actions/posts';
import {PostList} from './';

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

          <nav className="nav">
              <div className="left-div">
              <i class="fab fa-facebook" id="logo">akebook</i>
              </div>

              <div className="search-container">

                  <i class="fas fa-search" id="search-icon"></i>
                  <input type="text" placeholder="Search"/>

                  <div className="search-results">

                    <ul>
                      <li className="search-results-row">
                          <img src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg" alt="user-image" />
                          <span>GSD</span>
                      </li>


                      <li className="search-results-row">
                          <img src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg" alt="user-image" />
                          <span>GSD2</span>
                      </li>

                    </ul>
                  </div>
              </div>

              <div className="right-nav">


                    <div className="user">
                          <img id="user-dp" src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg" alt="user-image" />
                          <span>GSD2</span>
                    </div>


                    <div className="nav-links">
                          <ul>
                                <li>Log In</li>
                                <li>Log Out</li>
                                <li>Register</li>
                          </ul>
                    </div>
              </div>
          </nav>
           
          <PostList posts={posts}></PostList>
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