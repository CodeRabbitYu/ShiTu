/**
 * Created by Rabbit on 2017/5/23.
 */
import { combineReducers } from 'redux';
import ShiTuReducer from './ShiTuReducer';
// import GankReducer from './GankReducer';
//取决于这里你加入了多少 reducer
const rootReducer = combineReducers({
    ShiTuReducer,
});

export default rootReducer;