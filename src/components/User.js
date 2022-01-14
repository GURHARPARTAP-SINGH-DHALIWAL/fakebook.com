import React from "react";
import { fetchUserProfile } from "../actions/profile";
import { connect } from "react-redux";
import { API_Urls } from "../helpers/urls";
import { getAuthorisationTokenFromLocalStorage } from "../helpers/utils";
import { addFriend, removeFriend } from "../actions/friends";
import { Redirect } from "react-router-dom";
// SO basically this components mounts just before mounting API is Hit and the store is chaged accordingly

class User extends React.Component {

    constructor(props){
        super(props);
        this.state={
            success:null,
            error:null
        };
    }

    componentDidMount() {

        // react router passess three props match hostory location. match has all the url params
        const {match}=this.props;
        if(match.params.userId)
        {
            this.props.dispatch(fetchUserProfile(match.params.userId));
        }
    }

    componentDidUpdate(prevProps) {

      const {
        match:{params:prevParams}
      }=prevProps;

      const {
        match:{params:currentParams}
      }=this.props;


      if(prevParams&&currentParams&&prevParams.userId!=currentParams.userId)
      {
          this.props.dispatch(fetchUserProfile(currentParams.userId));
      }
      
    }

    checkUserAFriend=()=>{

        const {match}=this.props;
        const userId=match.params.userId;

        const index=this.props.friends.map(friend=>friend.to_user._id).indexOf(userId);
      
        if(index!=-1)
        {
            return true;
        }
        else
        return false;

    };

    handleAddFriend=async ()=>{
        const userId=this.props.match.params.userId;
        const url=API_Urls.addFriend(userId);
        console.log(url);
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
          },
        };

        const res=await fetch(url,options);
        const data=await res.json();

        if(data.success)
        {
            this.setState({
                success:"Friend Added!"
            });
            this.props.dispatch(addFriend(data.data.friendship));
        }
        else{
            this.setState({
                error:data.message,
                success:null
            });
        }
    };

    handleRemoveFriend=async ()=>{
        const userId=this.props.match.params.userId;
        const url=API_Urls.removeFriend(userId);


         const options = {
           method: "POST",
           headers: {
             "Content-type": "application/x-www-form-urlencoded",
             Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
           },
         };

         const res = await fetch(url, options);
         const data = await res.json();

         if (data.success) {
           this.setState({
             success: "Friend Removed!",
           });
           this.props.dispatch(removeFriend(userId));
         } else {
           this.setState({
             error: data.message,
             success: null,
           });
         }
        
    };
    render() { 

        const {profile}=this.props;
        const user=profile.user;
        console.log(profile);
        const {error,success}=this.state;


        if(this.props.match.params.userId===this.props.auth.user._id)
        {
          return (
            <Redirect to='/settings'></Redirect>
          );
        }

        if(profile.inProgress)
        {
            return (
              <div>
                <i class="fas fa-spinner" id="loader"></i>
              </div>
            );
        }

        const isUserAFriend=this.checkUserAFriend();

        

        console.log('User Profile>',this.props);
        return (
          <div className="settings">
            <div className="img-container">
              <img
                id="user-dp"
                src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                alt="user-image"
              />
            </div>

            <br />

            <div className="field">
              <div className="field-label">Email</div>
              <div className="field-value">{user.email}</div>
            </div>

            <div className="field">
              <div className="field-label">Name</div>

              <div className="field-value">{user.name}</div>
            </div>

            <div className="btn-grp">
              {isUserAFriend ? (
                <button className="btn save-button" onClick={this.handleRemoveFriend}>Remove Friend</button>
              ) : (
                <button className="btn save-button" onClick={this.handleAddFriend}>Add Friend</button>
              )}
            </div>

            {error && (
              <div className="alert error-dailog">{error}</div>
            )}
            {success && (
              <div className="alert success-dailog">{success}</div>
            )}
          </div>
        );
    }
}
 
function mapStateToProps(state){
    return {
        profile:state.profile,
        friends:state.friends,
        auth:state.auth

    };
};

export default connect(mapStateToProps)(User);