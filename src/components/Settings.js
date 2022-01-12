import React, { useReducer } from "react";
import { connect } from "react-redux";

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:props.auth.user.name,
           
            passowrd:'',
            confirmPassword:'',
            editMode:false
        };
    }

    handleChange=(fieldName,val)=>{
        this.setState({
            [fieldName]:val
        });
    };

    render() { 

        const{user}=this.props.auth;
        const {editMode}=this.state;
        return (
          <div className="settings">
            <div className="img-container">
              <img
                id="user-dp"
                src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                alt="user-image"
              />
            </div>

            <div className="field">
              <div className="field-label">Email</div>
              <div className="field-value">{user.email}</div>
            </div>

            <div className="field">
              <div className="field-label">Name</div>
              {editMode ? (
                <input
                  type="text"
                  onChange={(e) => {
                    this.handleChange("name", e.target.value);
                  }}
                  value={this.state.name}
                />
              ) : (
                <div className="field-value">{user.name}</div>
              )}
            </div>

            {editMode && (
              <div className="field">
                <div className="field-label">New Passowrd</div>
                <input
                  type="password"
                  onChange={(e) => {
                    this.handleChange("passowrd", e.target.value);
                  }}
                  value={this.state.passowrd}
                />
              </div>
            )}

            {editMode && (
              <div className="field">
                <div className="field-label">Confirm Passowrd</div>
                <input
                  type="password"
                  onChange={(e) => {
                    this.handleChange("confirmPassowrd", e.target.value);
                  }}
                  value={this.state.confirmPassword}
                />
              </div>
            )}

            <div className="btn-group">
              {editMode ? (
                <button className="button save-button">Save</button>
              ) : (
                <button
                  className="button edit-button "
                  onClick={(e) => this.handleChange("editMode", true)}
                >
                  Edit Profile
                </button>
              )}

              {editMode && (
                <div
                  className="go-back"
                  onClick={(e) => this.handleChange("editMode", false)}
                >
                  Go Back
                </div>
              )}
            </div>
          </div>
        );
    }
}
 
function mapStateToProps(state)
{
    return {
        auth:state.auth
    };
}

export default connect(mapStateToProps)(Settings);