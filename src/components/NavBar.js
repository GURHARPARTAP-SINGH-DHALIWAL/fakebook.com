import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { logoutUser } from "../actions/auth";
import { getAuthorisationTokenFromLocalStorage } from "../helpers/utils";
import { getSearchResults } from "../actions/search";

class NavBar extends React.Component {
    logOut=()=>{
        localStorage.removeItem('token');
        this.props.dispatch(logoutUser());
    };
    handleChange=(e)=>{
        const token=getAuthorisationTokenFromLocalStorage();
        if(token)
        {
            this.props.dispatch(getSearchResults(e.target.value));
        }
        else
        {
          e.target.value="Please Login to Search"
        }
    };
    render() { 
        const {auth}=this.props;
        const {results,inProgress}=this.props.search;
        return (
          <nav className="nav" id="navbar-container">
            {inProgress && (
              <div>
                <i class="fas fa-spinner" id="loader"></i>
              </div>
            )}
            <div className="left-div">
              <Link to="/">
                <i class="fab fa-facebook" id="logo">
                  <span id="logo-text">akebook</span>
                </i>
              </Link>
            </div>

            <div className="search-container">
              {/* <div id="icon-container">
               
                <i class="fas fa-search" id="search-icon"></i>
              </div> */}
              <input
                type="text"
                placeholder="Search"
                id="search-bar"
                onChange={(e) => this.handleChange(e)}
              ></input>

              {results.length > 0 && (
                <div className="search-results">
                  <ul>
                    {results.map((user) => {
                      return (
                        <Link to={`/user/${user._id}`}>
                          <li className="search-results-row" key={user._id}>
                            <img
                              src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
                              alt="user-image"
                            />
                            <span>{user.name}</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              )}
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
        auth:state.auth,
        search:state.search
    }

};

export default connect(mapStateToProps)(NavBar);
