import React from "react";
import { connect } from "react-redux";
import { createPost } from "../actions/posts";

class CreatePost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            content:''
        };
    };
    handleChange=(e)=>{
        this.setState({
            content:e.target.value
        });
    };
    handleOnClick=()=>{
        this.props.dispatch(createPost(this.state.content));
        this.setState({
            content:''
        });
    };
    render() { 
        return (
          <div className="create-post">
            <textarea
            placeholder="How are you feeling today? Fake?"
              name=""
              className="add-post"
              value={this.state.content}
              onChange={(e) => this.handleChange(e)}
            ></textarea>
            <div>
              <button id="add-post-btn" onClick={this.handleOnClick}>
                Add Post
              </button>
            </div>
          </div>
        );
    }
}
 
export default connect()(CreatePost);