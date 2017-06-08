/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';

const base = {
    //baseURL : !__DEV__ ? iOS?'http://172.16.17.61:1234/api':'http://172.16.17.61:1234/api'
    //     : iOS?'http://localhost:3000/api':'http://10.0.2.2:1234/api'
    // baseURL:iOS?'http://localhost:1234/api':'http://10.0.2.2:1234/api',

    // baseURL:!iOS?'http://localhost:1234/api':'http://172.16.17.61:1234/api',
    baseURL:'http://shitu.leanapp.cn/api'
};

const Config = {
    api:{
        userToken: base.baseURL + '/userToken',
        shitu:{
            detailURL : base.baseURL + '/shitu/detailURL',
        },
        gank:{
            listData : base.baseURL + '/gank/listData',
        },
        user:{
            login : base.baseURL  + '/user/login',
        },
        qiniu:{
            upLoadToken: base.baseURL + '/qiniu/upLoadToken',
        }
    },
    qiniu:{
        upload:'http://upload-z2.qiniu.com',
    },
};

module.exports = Config;
