import React from "react";
import { connect } from "react-redux";
import { clearAuthState, signup } from "../actions/auth";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    };
  }

  handleEmailChange = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  };

  handleNameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({
      cpassword: e.target.value,
    });
  };

  componentDidMount() {
    this.props.dispatch(clearAuthState());
  }
  

  handleSubmit = (e)=>{
      e.preventDefault();
      const {name,email,password,cpassword}=this.state;
      this.props.dispatch(signup(name,email,password,cpassword));

  };
  render() {
        console.log("Rendered");
        const {error,inProgress}=this.props.auth;
        const { auth } = this.props;

        if (auth.isLoggedin) {
          return <Redirect to="/"></Redirect>;
        }
    return (
      <div>
        <form action="" className="login-form">
          <span className="login-signup-header">Sign Up</span>
          {error && <div className="alert error-dailog">{error}</div>}

          <div className="field">
            <input
              type="text"
              required
              placeholder="Name"
              onChange={(e) => this.handleNameChange(e)}
              value={this.state.name}
              required
            />
          </div>

          <div className="field">
            <input
              type="Email"
              required
              placeholder="email"
              onChange={(e) => this.handleEmailChange(e)}
              value={this.state.email}
              required
            />
          </div>

          <div className="field">
            <input
              type="password"
              required
              placeholder="password"
              onChange={(e) => this.handlePasswordChange(e)}
              value={this.state.password}
              required
            />
          </div>

          <div className="field">
            <input
              type="password"
              required
              placeholder="comfirm password"
              onChange={(e) => this.handleConfirmPasswordChange(e)}
              value={this.state.cpassword}
              required
            />
          </div>

          <div className="field">
            {inProgress ? (
              <button disabled="true">Signing In ...</button>
            ) : (
              <button onClick={this.handleSubmit}>Sign In</button>
            )}
          </div>
        </form>
      </div>
    );
  }
}
 
const mapStateToProps=(state)=>{
    return {
        auth:state.auth
    }
};

export default connect(mapStateToProps)(Signup);