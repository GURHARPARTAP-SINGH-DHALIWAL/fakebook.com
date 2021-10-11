// for home route we display this
import React from "react";
import { PostList } from ".";

class Home extends React.Component {
    
    render() {
        console.log("props====>",this.props); 
        return (
            <PostList posts={this.props.posts}></PostList>
        );
    }
}
 
export default Home;