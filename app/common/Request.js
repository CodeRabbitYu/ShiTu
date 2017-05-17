/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';


export function fetch(obj) {
    let method = obj.method || 'GET';
    let params = obj.params || '';
    console.log(obj);
    return RNFetchBlob
        .fetch(method,obj.url)
        .then((res) => {
            // console.log(res);
            if (res.respInfo !== 200){
                return
            }
        })
        .then((res))
        .catch((e)=>{
            console.log(e);
        });
}

const Request = {
    config:{},
    fetch:(obj,successCakkBack,failCallBack)=>{
        return RNFetchBlob.fetch('GET',obj.url)
            .then((res)=>{
                console.log(res.respInfo);
                if (res.respInfo.status === 200){
                    // return res.json()
                    return '请求失败';
                }
            })
            .then((res)=>{
                // console.log(res);
            })
            .catch((e) => {
                // console.log(e);
            })
    },
    get:(url, successCallBack, failCallBack) =>{
        // console.log(url);
        // console.log(config);
        return RNFetchBlob
            .config(Request.config)
            .fetch('GET',url)
            .then((response) => response.json())
            .then((response)=>{
            console.log(response);
                successCallBack(response);
            })
            .catch((error)=>{
                failCallBack(error);
            })
    },
    post:(url, body, successCallBack, failCallBack) =>{
        // console.log(url);

        // console.log(config);

        let header = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        // console.log(header);
        return RNFetchBlob
            .config(Request.config)
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
        return RNFetchBlob.fetch('POST',url,{
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
                // console.log(error);
            });
    }
};

module.exports = Request;
