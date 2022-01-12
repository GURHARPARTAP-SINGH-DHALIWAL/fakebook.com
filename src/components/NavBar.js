import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { logoutUser } from "../actions/auth";

class NavBar extends React.Component {
    logOut=()=>{
        localStorage.removeItem('token');
        this.props.dispatch(logoutUser());
    };
    render() { 
        const {auth}=this.props;
        return (
          <nav className="nav">
            <div className="left-div">
              <Link to="/">
                {" "}
                <i class="fab fa-facebook" id="logo">
                  akebook
                </i>
              </Link>
            </div>

            <div className="search-container">
              {/* <i class="fas fa-search" id="search-icon"></i> */}
              <input type="text" placeholder="Search" />

              <div className="search-results">
                <ul>
                  <li className="search-results-row">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                      alt="user-image"
                    />
                    <span>GSD</span>
                  </li>

                  <li className="search-results-row">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                      alt="user-image"
                    />
                    <span>GSD2</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="right-nav">
              {auth.isLoggedin && (
                <div className="user">
                  <Link to="/settings">
                    <img
                      id="user-dp"
                      src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                      alt="user-image"
                    />
                  </Link>
                  <span>{auth.user.name}</span>
                </div>
              )}
              <div className="nav-links">
                <ul>
                  {!auth.isLoggedin && (
                    <li>
                      <Link to="/login">Log In</Link>
                    </li>
                  )}

                  {auth.isLoggedin && <li onClick={this.logOut}>Log Out</li>}

                  {!auth.isLoggedin && (
                    <li>
                      <Link to="/signup">Register</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}

// Tell which component you want from redux store
function mapStateToProps(state){
    return {
        auth:state.auth
    }

};

export default connect(mapStateToProps)(NavBar);
