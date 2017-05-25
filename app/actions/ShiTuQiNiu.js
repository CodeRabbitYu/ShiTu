/**
 * Created by Rabbit on 2017/5/24.
 */
import * as types from '../constant/ActionTypes';
import Config from '../common/Config';

import Request from '../common/Request';


export function qiNiuToken() {
    return dispatch => {
        return Request.get(Config.api.getUpLoadToken,(data)=>{
            console.log(data);
            dispatch(getQiNiuToken(data));
        },(error)=>{
            console.log(error);
            dispatch({type: types.QINIU_UPLOAD_TOKEN_ERROR, error: error});
        });
    }
};

export function getQiNiuToken(qiNiuData){
    return{
        type: types.QINIU_UPLOAD_TOKEN,
        qiNiuData
    }
}