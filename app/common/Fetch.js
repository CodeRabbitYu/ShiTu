/**
 * Created by Rabbit on 2017/5/16.
 */
'use strict';
import RNFetch from 'react-native-fetch-blob';
/***
 * import { fetch } from '../Fetch';
 *
 */

/***
 * @param url       请求网址
 * @param params    请求参数
 * @param method    请求类型
 * @param header    请求头
 * @returns {Promise}
 */
export function fetch(url, params, header, method = 'GET') {
    // console.log(url);
    // console.log(params);
    let URL = verifyURL(url);
    let postParams = {
        method,
        'User-Agent': 'ShunLian iPhone 9.0.1/1.0.0 ',
        'X-Device-ID': 'FC1D511A-70FA-4ABC-8E7A-F1AACCBF9BAA',
        'Accept-Encoding': 'gzip, deflate',
        'X-Ip': '192.168.1.1',
    };

    if (params) {
        if (method !== 'GET') {
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

    console.log(url);
    return new Promise((resolve, reject) => {
        RNFetch.fetch(method, url, postParams)
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