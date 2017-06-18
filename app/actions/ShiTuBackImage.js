/**
 * Created by Rabbit on 2017/5/26.
 */
import * as types from '../constant/ActionTypes';

import {
    AsyncStorage,
} from 'react-native';
let KEY = 'SHITUIMAGEKEY';

export function backImage(userToken) {
    return async dispatch => {
        // let result = await AsyncStorage.getItem(KEY,(Error,result)=>{
        //          if (result === null){
        //              // dispatch(getBackImage('timg'));
        //          }else {
        //              // console.log('获取图片成功' + result);
        //              dispatch(getBackImage(result));
        //          }
        //      });
        //  }
        try {
            let result = await AsyncStorage.getItem(KEY);
            console.log(result);
            dispatch(getBackImage(result))
        } catch (e) {
            console.log(e);
            dispatch(getBackImage('timg'))
        }
    }
};


export function getBackImage(imageURL) {
    return {
        type: types.BACKIMAGE_URL,
        imageURL
    }
}