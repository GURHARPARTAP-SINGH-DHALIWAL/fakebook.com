import React from "react";
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
               <button>Log In</button>
            </div>
        </form>
        );
    }
}
 
export default Login;