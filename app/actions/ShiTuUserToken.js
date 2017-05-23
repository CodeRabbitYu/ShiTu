/**
 * Created by Rabbit on 2017/5/23.
 */
import * as TYPES from '../constant/ActionTypes';
import Config from '../common/Config';

import Request from '../common/Request';


export let userToken = () => {
    console.log('222222222');
    return dispatch => {
        dispatch(loadUserToken());
        return Request(Config.api.getUserToken,(data)=>{
            console.log(data);
            dispatch(getUserToken(data.token));
        },(error)=>{
            console.log(error);
            dispatch({type: TYPES.USER_TOKEN_ERROR, error: error});
        });
    }
};

let loadUserToken = () =>{
    return{
        type: TYPES.USER_TOKEN_SUCCESS,
    }
};

let getUserToken = (token) => {
    return{
        type: TYPES.USER_TOKEN_SUCCESS,
        token: token
    }
}