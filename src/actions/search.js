import { API_Urls } from "../helpers/urls";
import { getAuthorisationTokenFromLocalStorage } from "../helpers/utils";
import { SEARCH_SUCCESS, START_SEARCH } from "./actionTypes";

export function searchSuccess(results){
    return {
        type:SEARCH_SUCCESS,
        results
    };
};


export function searchStart(){
    return {
        type:START_SEARCH
    };
};

export function getSearchResults(searchText){
    return (dispatch)=>{
            const url=API_Urls.userSearch(searchText);
            dispatch(searchStart());
            fetch(url, {
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${getAuthorisationTokenFromLocalStorage()}`,
              },
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.success){
                    dispatch(searchSuccess(data.data.users));
                }
                else{
                    dispatch(searchSuccess([]));
                }
            })
            .catch(err=>console.log(err))
            ;
    };
};