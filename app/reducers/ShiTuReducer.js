/**
 * Created by Rabbit on 2017/5/23.
 */
import * as types from '../constant/ActionTypes';

const initialState = {
    imageURL: 'timg',
    userToken: '123456789',
    webViewUrl: '',
    qiNiuToken: '',
    qiNiuKey: '',
};
let ShiTuReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case types.USER_TOKEN_SUCCESS:
            console.log('111');
            return Object.assign({}, state, {
                userToken: action.userToken,
            });
        case types.QINIU_UPLOAD_TOKEN:
            console.log('222');
            return Object.assign({}, state, {
                qiNiuToken:action.qiNiuToken,
                qiNiuKey: action.qiNiuKey,
            });
        case types.WEBVIEW_URL:
            console.log('333');
            return Object.assign({}, state ,{
                webViewUrl:action.webViewUrl,
            });
        default:
            console.log(action.type);
            // console.log(initialState);
            return state;
    }
}

export default ShiTuReducer;