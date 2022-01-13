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
                  src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"
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