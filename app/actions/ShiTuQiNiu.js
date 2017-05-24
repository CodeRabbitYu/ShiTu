/**
 * Created by Rabbit on 2017/5/24.
 */
import * as types from '../constant/ActionTypes';
import Config from '../common/Config';

import Request from '../common/Request';

import {
    AsyncStorage,
} from 'react-native';



export function userToken() {
    return dispatch => {
        return Request.get(Config.api.getUserToken,(data)=>{
            dispatch({type: types.USER_TOKEN_SUCCESS,token:data.token});
        },(error)=>{
            console.log(error);
            dispatch({type: types.USER_TOKEN_ERROR, error: error});
        });
    }
};