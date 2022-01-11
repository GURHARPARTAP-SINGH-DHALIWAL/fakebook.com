import React from "react";
import { login } from "../actions/auth";
import {connect} from 'react-redux';
class Login extends React.Component {

    constructor(props)
    {
        super(props);
     
        this.state={
            email:'',
            password:''
        }
    }
    handleEmailChange=(e)=>{
        console.log(e.target.value);
        this.setState({
            email:e.target.value
        });
    };

    handlePasswordChange=(e)=>{
        this.setState({
            password:e.target.value
        });
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        const {email,password}=this.state;
        this.props.dispatch(login(email,password));
    };
    render() { 

        const {error,inProgress}=this.props.auth;
        console.log("Renderd", inProgress, this.props.auth);
        return (
          <form action="" className="login-form">
            <span className="login-signup-header">Log In</span>
            {error && <div className="alert error-dailog">{error}</div>}

            <div className="field">
              <input
                type="Email"
                required
                placeholder="email"
                onChange={(e) => this.handleEmailChange(e)}
                value={this.state.email}
              />
            </div>

            <div className="field">
              <input
                type="password"
                required
                placeholder="password"
                onChange={(e) => this.handlePasswordChange(e)}
                value={this.state.password}
              />
            </div>

            <div className="field">
              {
               inProgress ? (
                <button disabled="true">Logging In ...</button>
              ) : (
                <button onClick={this.handleSubmit} >
                  Log In
                </button>
              )
              }
            </div>
          </form>
        );
    }
}
 

function mapStateToProps(state)
{
    return {
        auth:state.auth
    }
}
export default connect(mapStateToProps)(Login);