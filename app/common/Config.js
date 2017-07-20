/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';

const base = {
    // baseURL : iOS?'http://localhost:3000/api':'http://192.168.31.236:3000/api',


    // baseURL:iOS?'http://localhost:1234/api':'http://10.0.2.2:1234/api',

    // baseURL:!iOS?'http://localhost:1234/api':'http://172.16.17.61:1234/api',

    // baseURL :__DEV__ ? iOS?'http://localhost:3000/api':'http://172.16.17.11:3000/api' : 'http://shitu.leanapp.cn/api'
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
        },
        test:{
            test: base.baseURL + '/test',
        }
    },
    qiniu:{
        upload:'http://upload-z2.qiniu.com',
    },
};

module.exports = Config;
