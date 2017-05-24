/**
 * Created by Rabbit on 2017/5/23.
 */
import * as types from '../constant/ActionTypes';

const initialState = {
    imageURL: 'timg',
    token: '',
    webViewUrl: '',
    qiNiuToken: '',
    qiNiuKey: '',
};
let ShiTuReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case types.USER_TOKEN_SUCCESS:
            console.log(action);
            return Object.assign({}, state, {
                token: action.token,
            });
        case types.QINIU_UPLOAD_TOKEN:
            return Object.assign({}, state, {
                qiNiuToken:action.qiNiuToken,
                qiNiuKey: action.qiNiuKey,
            });
        case types.WEBVIEW_URL:
            return Object.assign({}, state ,{
                webViewUrl:action.webViewUrl,
            });

    }
    return state;
}

export default ShiTuReducer;