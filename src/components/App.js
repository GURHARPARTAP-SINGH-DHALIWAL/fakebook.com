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