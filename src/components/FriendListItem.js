import React from "react";
import { Link } from "react-router-dom";

class FriendListItem extends React.Component {
    render() { 

        const friend=this.props.friend;
        console.log("item",friend);
        

        return (
          <div>
            <Link to={`/user/${friend._id}`} className="friends-item">
              <div className="friends-img">
                <img
                  id="user-dp"
                  src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                  alt="user-image"
                />
              </div>
              <div className="friends-name">{friend.email}</div>
            </Link>
          </div>
        );
    }
}
 
export default FriendListItem;