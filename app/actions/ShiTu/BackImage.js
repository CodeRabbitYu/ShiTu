/**
 * Created by Rabbit on 2017/5/26.
 */
import * as types from '../../constant/ActionTypes';

import {
    AsyncStorage,
} from 'react-native';
let KEY = 'SHITUIMAGEKEY';

export function backImage(userToken) {
    return async dispatch => {
        await AsyncStorage.getItem(KEY,(Error,result)=>{
                 if (result === null){
                     dispatch(getBackImage('timg'));
                 }else {
                     // console.log('获取图片成功' + result);
                     dispatch(getBackImage(result));
                 }
             });
         }
        // try {
        //     let result = await AsyncStorage.getItem(KEY);
        //     dispatch(getBackImage(result));
        //     userToken();
        // } catch (e) {
        //     console.log('没有获得图片'+e);
        //     dispatch(getBackImage('timg'))
        // } finally {
        //     // dispatch(getBackImage('timg'))
        // }
    // }
};


export function getBackImage(imageURL) {
    return {
        type: types.BACKIMAGE_URL,
        imageURL
    }
}