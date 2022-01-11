import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <nav className="nav">
        <div className="left-div">
       <Link to="/"> <i class="fab fa-facebook" id="logo">akebook</i></Link>
        </div>

        <div className="search-container">

            {/* <i class="fas fa-search" id="search-icon"></i> */}
            <input type="text" placeholder="Search"/>

            <div className="search-results">

              <ul>
                <li className="search-results-row">
                    <img src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg" alt="user-image" />
                    <span>GSD</span>
                </li>


                <li className="search-results-row">
                    <img src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg" alt="user-image" />
                    <span>GSD2</span>
                </li>

              </ul>
            </div>
        </div>

        <div className="right-nav">


              <div className="user">
                    <img id="user-dp" src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg" alt="user-image" />
                    <span>GSD2</span>
              </div>


              <div className="nav-links">
                    <ul>
                          <li><Link to="/login">Log In</Link></li>
                          <li><Link to="/logout">Log Out</Link></li>
                          <li><Link to="/signup">Register</Link></li>
                    </ul>
              </div>
        </div>
    </nav>
     );
}
 
export default NavBar;