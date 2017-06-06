/**
 * Created by Rabbit on 2017/5/26.
 */
import * as types from '../constant/ActionTypes';

import {
    AsyncStorage,
} from 'react-native';
let KEY = 'SHITUIMAGEKEY';
export function backImage() {
    return dispatch => {
        return AsyncStorage.getItem(KEY,(Error,result)=>{
                if (result === null){
                    dispatch(getBackImage('timg'));
                }else {
                    console.log('获取图片成功' + result);
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