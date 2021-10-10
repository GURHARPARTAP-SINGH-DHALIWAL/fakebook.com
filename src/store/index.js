import {createStore,applyMiddleware} from 'redux';
// so wg=henever our action has an async task it return a function instead of object and then thunk calls the function passing dispatch as arguement and after async task simple object is returned
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../reducers/index'; 


export default function configureStore(){
    const store=createStore(reducer,applyMiddleware(thunk,logger));

    return store;
        

}