/**
 * Created by Rabbit on 2017/5/26.
 */
import * as types from '../constant/ActionTypes';
import Config from '../common/Config';
import Request from '../common/Request';

import {
    AsyncStorage,
} from 'react-native';
let KEY = 'SHITUIMAGEKEY';
export function backImage() {
    return dispatch => {
        return AsyncStorage.getItem(KEY,(Error,result)=>{
                if (result === null){
                    dispatch(getBackImage('timg'))
                }else {
                    console.log('获取图片成功' + result);
                    // TOKEN = '0ddc64eb-48e3-4d4c-a83c-a61caa2450d4';
                    dispatch(getBackImage(result));
                }
            });
        }
};


export function getBackImage(imageURL) {
    return {
        type: types.BACKIMAGE_URL,
        imageURL
    }
}