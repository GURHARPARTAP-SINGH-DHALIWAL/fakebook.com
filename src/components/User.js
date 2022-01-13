import React from "react";
import { fetchUserProfile } from "../actions/profile";
import { connect } from "react-redux";


class User extends React.Component {

    componentDidMount() {

        // react router passess three props match hostory location. match has all the url params
        const {match}=this.props;
        if(match.params.userId)
        {
            this.props.dispatch(fetchUserProfile(match.params.userId));
        }
    }
    render() { 

        const {profile}=this.props;
        const user=profile.user;
        console.log(profile);

        if(profile.inProgress)
        {
            return (
              <div>
                <i class="fas fa-spinner" id="loader"></i>
              </div>
            );
        }

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
                <button className="btn save-button">Add Friend</button>
            </div>

        


          </div>
        );
    }
}
 
function mapStateToProps(state){
    return {
        profile:state.profile
    };
};

export default connect(mapStateToProps)(User);