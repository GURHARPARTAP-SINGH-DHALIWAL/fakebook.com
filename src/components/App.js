import React from 'react';
import {connect} from 'react-redux';
import { fetchPosts } from '../actions/posts';
import {PostList,NavBar} from './';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Page404 from './Page404';

const login = () => {
  return ( 
    <div>Hello</div>
   );
}
 



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
    // for the router to woirk wrap the root element inside the router
  
    return (
      <Router>
      <div>

            <NavBar />
            <Switch>
            <Route exact path="/" render={
              (props)=>{
               return  <Home {...props} posts={posts}/>
              }
            }/>
            <Route exact path="/login" component={login} />
            <Route  component={Page404} />

            </Switch>
         

      </div>
      </Router>
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