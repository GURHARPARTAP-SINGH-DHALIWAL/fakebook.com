import { SEARCH_SUCCESS, START_SEARCH } from "../actions/actionTypes";

const initialState={
    results:[],
    inProgress:false,
    error:null
};

export function search(state=initialState,action){
    switch(action.type){
        case SEARCH_SUCCESS:
            return {
                ...state,
                inProgress:false,
                results:action.results
            };
        case START_SEARCH:
            return {
                ...state,
                inProgress:true
            };
        default:
            return state;
    };
};