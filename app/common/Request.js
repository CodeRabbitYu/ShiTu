/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';
import queryString from 'query-string';

import {
    AsyncStorage
} from 'react-native';

const Request = {
    // 框架可以用过cancel 取消某个网络请求
    /**
     * 设置Header请求头
     */
    Header:{
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    /**
     * Config参数
     */
    config:{
        // 指示器,iOS专属
        indicator:true,
        // 超时
        timeout:3000
        // 缓存
        // fileCache : bool,
        // 缓存地址
        // path : string,
        // appendExt : string,
        // session : string,
        // addAndroidDownloads : any,
    },

    /**
     *
     * @param method            请求方式GET, POST, PUT, DELETE
     * @param url               请求网址
     * @param params            请求参数
     * @param successCallBack   正确数据的返回
     * @param failCallBack      错误数据的返回
     * @param config            网络配置文件
     * @param header            请求头
     * @returns {Promise.<TResult>}
     */
    fetch: async(method, url, params, successCallBack, failCallBack, config, header ) => {
        let _method = method.toUpperCase();

        let _params;

        let _config = Request.config;

        // let userData = await AsyncStorage.getItem('USER_TOKEN');

        if (_method === 'GET' && params) {
            url += '?' + queryString.stringify(params);
        }

        if (_method === 'POST' && params) {
            _params =  JSON.stringify(params);
        }

        if (config) {
            _config.config = config;
        }

        console.log('url:', url);
        console.log('_config:', _config);
        console.log('_method:', _method);

        return RNFetchBlob
            .config(_config)
            .fetch(_method ,url ,Request.Header, _params )
            .then((response) => {
                // console.log(response);
                if (response.respInfo.status === 200){
                    return response.json();
                }else {
                    return failCallBack(response.json());
                }
            })
            .then((response)=>{
                successCallBack(response);
            })
            .catch((error)=>{
                console.log(error);
                failCallBack(error);
            })
    },

    /**
     * @param url               请求网址
     * @param body              要上传的信息,会自动转码
     * @param uploadProgress    上传进度
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns
     */
    upload:(url,body,uploadProgress,successCallBack,failCallBack) => {
        return RNFetchBlob
            .config(Request.config)
            .fetch('POST',url,{
            'Content-Type' : 'multipart/form-data',
        },body)
            .uploadProgress((written, total) => {
                // 搜索进度打印
                // console.log('搜索进度:'+written / total);
            })
            .progress((received, total) => {
                let perent = received / total;
                // console.log('上传进度:' + perent);
                uploadProgress(perent);
            })
            .then((response)=>{
                if (response.respInfo.status === 200){
                    return response.json();
                }else {
                    return failCallBack(response);
                }
            })
            .then((response)=> {
                // console.log(response);
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            });
    }
};

export default Request;
