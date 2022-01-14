import { API_Urls } from "../helpers/urls";
import { getAuthorisationTokenFromLocalStorage } from "../helpers/utils";
import { ADD_FRIEND, FETCH_FRIENDS_SUCCESS, REMOVE_FRIEND } from "./actionTypes";

export function fetchFriendSuccess(friends){
    return {
        type:FETCH_FRIENDS_SUCCESS,
        friends
    }
};

export function addFriend(friendShip){
    return {
        type:ADD_FRIEND,
        friendShip
    };
};
export function removeFriend(userId){
    return {
        type:REMOVE_FRIEND,
        userId
    }
};

export function fetchFriends(userId){

    return (dispatch) => {
      const url = API_Urls.fetchFriends();

      fetch(url, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(fetchFriendSuccess(data.data.friends));
          }
        })
        .catch(err=>console.log(err));
    };;

};