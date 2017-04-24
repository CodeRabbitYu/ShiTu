/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';

const base = {
    baseURL:'http://localhost:1234/api',
};

const Config = {

    api:{
        getUserToken: base.baseURL + '/ShiTu/getUserToken',
        getUpLoadToken: base.baseURL + '/ShiTu/getUpLoadToken',
        postWebUrl : base.baseURL + '/ShiTu/postWebUrl',
    },
    qiniu:{
        upload:'http://upload-z2.qiniu.com',
    },
};

module.exports = Config;
