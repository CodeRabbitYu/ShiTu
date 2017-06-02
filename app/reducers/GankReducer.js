/**
 * Created by Rabbit on 2017/5/23.
 */
import * as types from '../constant/ActionTypes';

const initialState = {
    welfareData: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false
};

export default function ShiTuReducer(state = initialState, action){
    // console.log(action);
    switch (action.type) {
        case types.LOAD_WELFARE_LIST:
            // console.log(action);
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing
            });
        case types.GET_WELFARE_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                welfareData:action.welfareData,
            });
        default:
            return state;
    }
}

