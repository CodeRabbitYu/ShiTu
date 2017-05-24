/**
 * Created by Rabbit on 2017/5/23.
 */
import * as types from '../constant/ActionTypes';
import Config from '../common/Config';

import Request from '../common/Request';


export function userToken() {
    return dispatch => {
        // dispatch(loadUserToken());
        return Request.get(Config.api.getUserToken,(data)=>{
            console.log(data);
            dispatch(getUserToken(data.token));
        },(error)=>{
            console.log(error);
            dispatch({type: types.USER_TOKEN_ERROR, error: error});
        });
    }
};

let loadUserToken = () =>{
    return{
        type: types.USER_TOKEN_SUCCESS,
    }
};

let getUserToken = (token) => {
    return{
        type: types.USER_TOKEN_SUCCESS,
        token: token
    }
}