/**
 * Created by Rabbit on 2017/5/23.
 */
import { combineReducers } from 'redux';
import ShiTuReducer from './ShiTuReducer';
import GankReducer from './GankReducer';
// import StackReducer from './StackReducer';

import { MyApp } from '../APP';

function nav(state, action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = MyApp.router.getStateForAction(action, state);
            break;
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}


//取决于这里你加入了多少 reducer
const RootReducer = combineReducers({
    ShiTuReducer,
    GankReducer,
    nav
});

export default RootReducer;