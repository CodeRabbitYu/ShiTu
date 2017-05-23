/**
 * Created by Rabbit on 2017/5/23.
 */
import { combineReducers } from 'redux';
import ShiTuReducer from './ShiTuReducer';
import GankReducer from './GankReducer';

const RootReducer = combineReducers({
    ShiTuReducer,

});

export default RootReducer;