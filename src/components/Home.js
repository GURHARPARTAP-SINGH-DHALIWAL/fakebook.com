// for home route we display this
import React from "react";
import { PostList } from ".";
import FriendList from "./FriendList";

class Home extends React.Component {
    
    render() {
        console.log("props====>",this.props); 
        const {isLoggedIn,friends}=this.props;
        return (
          <div className="home">
            <PostList posts={this.props.posts}></PostList>
            {isLoggedIn&&<FriendList friends={friends}> </FriendList>}
          </div>
        );
    }
}
 
export default Home;