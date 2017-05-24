/**
 * Created by Rabbit on 2017/5/23.
 */
import { combineReducers } from 'redux';
import ShiTuReducer from './ShiTuReducer';
// import GankReducer from './GankReducer';

const rootReducer = combineReducers({
    ShiTuReducer,
});

export default rootReducer;