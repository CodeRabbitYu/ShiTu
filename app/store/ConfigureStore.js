/**
 * Created by Rabbit on 2017/5/23.
 */
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from '../reducers/rootReducer';

let middlewares = [];

middlewares.push(logger);
middlewares.push(thunk);

/* global __DEV__  */
// if (__DEV__) {
// }

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState){
    return createStoreWithMiddleware(RootReducer,initialState);
}
