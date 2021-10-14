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
        console.log("Renderd");
        return (
            <form action="" className="login-form">
            <span className="login-signup-header">Log In</span>
            <div className="field">
                <input type="Email" required placeholder="email" onChange={(e)=>this.handleEmailChange(e)} value={this.state.email} />
            </div>

            <div className="field">
                <input type="password" required placeholder="password"  onChange={(e)=>this.handlePasswordChange(e)} value={this.state.password} />
            </div>

            <div className="field">
               <button onClick={this.handleSubmit}>Log In</button>
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
export default Login;