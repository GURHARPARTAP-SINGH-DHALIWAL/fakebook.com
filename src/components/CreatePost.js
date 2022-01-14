import React from "react";
import { connect } from "react-redux";
import { createPost } from "../actions/posts";
import { getAuthorisationTokenFromLocalStorage } from "../helpers/utils";

class CreatePost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            content:''
        };
    };
    handleChange=(e)=>{
      const token=getAuthorisationTokenFromLocalStorage();

      if(token)
      {
            this.setState({
              content: e.target.value,
            });
      }
      else{
        this.setState({
          content:"Please Login to add a Fake post"
        });
      }
    };
    handleOnClick=()=>{
       const token=getAuthorisationTokenFromLocalStorage();
       if(token)
       {
          this.props.dispatch(createPost(this.state.content));
          this.setState({
            content: "",
          });
       }
       else
       {
          this.setState({
            content: "Please Login to add a Fake post",
          });
       }
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