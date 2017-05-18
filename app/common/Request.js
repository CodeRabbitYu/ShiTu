/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';

const Request = {
    // 框架可以用过cancel 取消某个网络请求
    GetConfig:{
        // 指示器,iOS专属
        indicator:true,
        // 超时
        // timeout:15000
        // 缓存
        // fileCache : bool,
        // 缓存地址
        // path : string,
        // appendExt : string,
        // session : string,
        // addAndroidDownloads : any,
    },
    PostConfig:{
        indicator:true
    },
    UpLoadConfig:{
        indicator:true
    },
    get:(url, successCallBack, failCallBack) =>{
        // console.log(url);
        // console.log(config);
        return RNFetchBlob
            .config(Request.PostConfig)
            .fetch('GET',url)
            .then((response) => response.json())
            .then((response)=>{
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            })
    },
    post:(url, body, successCallBack, failCallBack) =>{

        let header = {
            method: 'POST',
            body: JSON.stringify(body)
        };
        return RNFetchBlob
            .config(Request.PostConfig)
            .fetch('POST',url,header)
            .then((response) => response.json())
            .then((response)=>{
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            })
    },
    upload:(url,body,uploadProgress,successCallBack,failCallBack) => {
        return RNFetchBlob
            .config(Request.UpLoadConfig)
            .fetch('POST',url,{
            'Content-Type' : 'multipart/form-data',
        },body)
            .uploadProgress((written, total) => {
            })
            .progress((received, total) => {
                let perent = received / total;
                // 搜索进度打印
                console.log(perent);
                uploadProgress(perent);
            })
            .then((response)=>response.json())
            .then((response)=> {
                // console.log(response);
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            });
    }
};

module.exports = Request;
