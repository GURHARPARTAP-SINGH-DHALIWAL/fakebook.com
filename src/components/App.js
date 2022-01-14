import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchPosts } from '../actions/posts';
import {PostList,NavBar} from './';
import {BrowserRouter as Router,Link,Redirect,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Page404 from './Page404';
import Login from './Login';
import Signup from './Signup';
import  jwt_decode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import Settings from './Settings';
import { getAuthorisationTokenFromLocalStorage } from '../helpers/utils';
import User from './User';
import { fetchFriends } from '../actions/friends';

const login = () => {
  return ( 
    <div>Hello</div>
   );
}

//  The props provided by the router has location, hostiory and other things we can use that
const PrivateRoute = (props) => {
  const {path,isLoggedin,component:Component}=props;
  return <Route path={path} render={(props)=>{
      return isLoggedin ? <Component {...props} /> : <Redirect to={{
        pathname:'/login',
        state:{
          from:props.location
        }
      }} />  
  }}
  ></Route>;
}
 



class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchPosts());
    const token=getAuthorisationTokenFromLocalStorage();
    if(token)
    {
      const user=jwt_decode(token);
      console.log(user);
      this.props.dispatch(authenticateUser({
        email:user.email,
        _id:user._id,
        name:user.name
      }));

      this.props.dispatch(fetchFriends(user._id));

    }
  }
  render() { 
    console.log('PROPS',this.props);
     let {posts}=this.props;
     const{friends}=this.props;
     const {isLoggedin}=this.props.auth;
     

    //  if(!posts)
    //  posts=[]; 
      
   
     console.log("posts Array",posts);
     
    // for the router to woirk wrap the root element inside the router
  
    return (
      <Router>
        <div>
          <NavBar />
          <br />
          <br />
          <br />
          
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props}  friends ={friends}  isLoggedIn={isLoggedin} posts={posts} />;
              }}
            />

            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={this.props.auth.isLoggedin}
            ></PrivateRoute>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              path="/user/:userId"
              component={User}
              isLoggedin={this.props.auth.isLoggedin}
            ></PrivateRoute>
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
 
function mapStateToProps(state){
         return {
           posts:state.posts,
           auth:state.auth,
           friends:state.friends
         }
};


// So wgat this will do is it will poss our app
// by refernce and pass the data return from mapstatetoprops as props to this component when this will be rendered
// internlly it renders app component insise another component which is in socketcontext.consumer 
// if the othe compine t =have some constructor it si wrapped inside another wrapper
const connectedApp=connect(mapStateToProps)(App);

export default connectedApp;