import React from "react";
import FriendListItem from "./FriendListItem";

class FriendList extends React.Component {

    render() { 
      
        return <div className="friends-list" id="f-list">
            <div className="header">
                    Friends
            </div>
            {
                this.props.friends&& this.props.friends.length===0&&(
                    <div className="no-friends">No Friends Found!</div>
                )
            }


            {
                this.props.friends&&
                this.props.friends.map(friend=>{
                 
                   return ( <FriendListItem friend={friend.to_user} key={friend._id} />);
                })
            }
        </div>;
    }
}
 

export default FriendList;