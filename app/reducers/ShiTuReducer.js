/**
 * Created by Rabbit on 2017/5/23.
 */
import * as TYPES from '../constant/ActionTypes';

const initialState = {
    imageURL: 'timg',
    userToken: '123456789',
    webViewUrl: '',
    qiNiuToken: '',
    qiNiuKey: '',
};

export default function ShiTuReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case TYPES.USER_TOKEN_SUCCESS:
            console.log('111');
            return Object.assign({}, state, {
                ...state,
                userToken: action.userToken,
            });
        case TYPES.QINIU_UPLOAD_TOKEN:
            console.log('222');
            return Object.assign({}, state, {
                ...state,
                qiNiuToken:action.qiNiuToken,
                qiNiuKey: action.qiNiuKey,
            });
        case TYPES.WEBVIEW_URL:
            console.log('333');
            return Object.assign({}, state ,{
                ...state,
                webViewUrl:action.webViewUrl,
            });
        default:
            console.log(action.type);
            // console.log(initialState);
            return state;
    }
}