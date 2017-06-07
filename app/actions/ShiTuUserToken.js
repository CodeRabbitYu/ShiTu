/**
 * Created by Rabbit on 2017/5/23.
 */
import * as types from '../constant/ActionTypes';
import Config from '../common/Config';

import Request from '../common/Request';

import {
    AsyncStorage,
} from 'react-native';

let KEY = 'USERTOKEN';
export function userToken() {
    return dispatch => {
        return Request.get(Config.api.userToken,(data)=>{

            AsyncStorage.getItem(KEY,(Error,result)=>{
                if (result === null){
                    Request.get(Config.api.getUserToken,(data)=>{
                        // console.log(data);
                        if (data && data.success){
                            let token = data.token;
                            AsyncStorage.setItem(KEY,token,(error)=>{
                                if (error){
                                    console.log('存储失败' + error);
                                }else {
                                    console.log('存储成功');
                                    dispatch(getUserToken(token));
                                }
                            })
                        }
                    },(error)=>{
                        console.log(error);
                        // TOKEN = '0ddc64eb-48e3-4d4c-a83c-a61caa2450d4';
                    })
                }else {
                    console.log('获取成功' + result);
                    // TOKEN = '0ddc64eb-48e3-4d4c-a83c-a61caa2450d4';
                    dispatch(getUserToken(result));
                }
            });

        },(error)=>{
            console.log(error);
            dispatch({type: types.USER_TOKEN_ERROR, error: error});
        });
    }
};


export function getUserToken(userToken) {
    return {
        type: types.USER_TOKEN_SUCCESS,
        userToken
    }
}