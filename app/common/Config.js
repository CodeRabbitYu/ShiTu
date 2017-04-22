/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';

const base = {
    baseURL:'http://localhost:1234/api',
};

const Config = {

    api:{
        getToken: base.baseURL + '/ShiTu/getToken',
        getUpLoadToken: base.baseURL + '/ShiTu/getUpLoadToken',
        getWebUrl : base.baseURL + '/ShiTu/getWebUrl',
    },
    qiniu:{
        upload:'http://upload-z2.qiniu.com',
    },
};

module.exports = Config;
