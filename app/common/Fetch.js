/**
 * Created by Rabbit on 2017/5/16.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';

const Header = {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export async function get(url, successCallBack, failCallBack) {
    try {
        let data = await RNFetchBlob.fetch('GET',url,Header);
        if (data.respInfo.status === 200){
            return successCallBack(await data.json());
        }else {
            return failCallBack(data.json());
        }
    } catch (error){
        failCallBack(error);
    }
}


export async function post(url, body, successCallBack, failCallBack) {

    // Header.body = JSON.stringify(body);

    // let Header={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     body:body
    // }
    // RNFetchBlob.config(Request.PostConfig);


    // let header = JSON.stringify(Header);
    // header.body = '111';

    // console.log(JSON.stringify(body));
    // console.log(header);

    try {
        let data = await RNFetchBlob.fetch('POST',url,Header,JSON.stringify(body));
        if (data.respInfo.status === 200){
            return successCallBack(await data.json());
        }else {
            console.log(data);
            return failCallBack(data.json());
        }
    } catch (error){
        console.log(error);
        failCallBack(error);
    }
}

export function header(Obj) {
    console.log(Obj);
    return fetch('','',Obj,'POST');
}

/***
 * @param url       请求网址
 * @param params    请求参数
 * @param method    请求类型
 * @param header    请求头
 * @returns {Promise}
 */
export function fetch(url, params, header, method='GET') {
    // console.log(url);
    // console.log(params);
    let rt_method = method;

    if (header){

        return;
    }

    let URL = verifyURL(url);
    let postParams = {
        rt_method,
        'User-Agent': 'ShunLian iPhone 9.0.1/1.0.0 ',
        'X-Device-ID': 'FC1D511A-70FA-4ABC-8E7A-F1AACCBF9BAA',
        'Accept-Encoding': 'gzip, deflate',
        'X-Ip': '192.168.1.1',
    };
    console.log(postParams);
    if (params) {
        if (rt_method !== 'GET') {
            postParams.body = JSON.stringify(params);
        } else {
            let keys = Object.keys(params);
            if (keys.length) {
                let args = keys.map(item => {
                    return `${item}=${params[item]}`
                });
                URL = `${URL}?${args.join('&')}`;
            }
        }
    }

    return new Promise((resolve, reject) => {
        RNFetch.fetch(rt_method, URL, postParams)
            .then((response) => {
                // console.log(response);
                if (response.respInfo.status === 200) {
                    return response.json()
                } else {
                    reject(response);
                }
            })
            .then((response) => {
                console.log(response);
                resolve(response)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    });
}

// 检查url
function verifyURL(url) {
    // 验证url
    let verifyURL;

    // 判断是否填写了url地址
    if (!url) {
        console.log('url为空');
        return alert('url为空,请填写url');
    } else {
        // 处理网址中的前后两端的空格
        verifyURL = url.replace(/(^s*)|(s*$)/g, '');
        return verifyURL;
    }

}

