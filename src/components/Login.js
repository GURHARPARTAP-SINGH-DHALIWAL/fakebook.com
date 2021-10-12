const Login = () => {
    return ( 
        <form action="" className="login-form">
            <span className="login-signup-header">Log In</span>
            <div className="field">
                <input type="Email" required placeholder="email" />
            </div>

            <div className="field">
                <input type="password" required placeholder="password"  />
            </div>

            <div className="field">
               <button>Log In</button>
            </div>
        </form>
     );
}
 
export default Login;