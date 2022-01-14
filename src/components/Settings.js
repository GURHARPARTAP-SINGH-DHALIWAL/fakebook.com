import React, { useReducer } from "react";
import { connect } from "react-redux";
import { clearAuthState, editUser } from "../actions/auth";

class Settings extends React.Component {
  // Error== false only after profile gets updated 
    constructor(props){
        super(props);
        this.state={
            name:props.auth.user.name,
           
            passowrd:'',
            confirmPassword:'',
            editMode:false
        };
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    handleChange=(fieldName,val)=>{
        this.setState({
            [fieldName]:val
        });
    };

    handleSave=()=>{
      const {name,passowrd,confirmPassword}=this.state;
      const {user}=this.props.auth;

      this.props.dispatch(editUser(name,passowrd,confirmPassword,user._id));
    };

    render() { 

        const{user,error}=this.props.auth;
        const {editMode}=this.state;
        return (
          <div className="settings">
            <div className="img-container">
              <img
                id="user-dp"
                src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                alt="user-image"
              />
            </div>

            {error && <div className="alert error-dailog">{error}</div>}
            {error === false && (
              <div className="alert success-dailog">
                Profile Successfully Updated
              </div>
            )}
            <br />

            <div className="field">
              <div className="field-label">Email</div>
              <div className="field-value">{user.email}</div>
              <div className="divider"></div>
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
                <div>
                  <div className="field-value">{user.name}</div>
                  <div className="divider"></div>
                </div>
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
                <div className="field-label">Confirm Password</div>
                <input
                  type="password"
                  onChange={(e) => {
                    this.handleChange("confirmPassword", e.target.value);
                  }}
                  value={this.state.confirmPassword}
                />
              </div>
            )}

            <div className="btn-grp">
              {editMode ? (
                <button
                  className="button save-button"
                  onClick={this.handleSave}
                >
                  Save
                </button>
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