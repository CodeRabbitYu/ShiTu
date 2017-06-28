/**
 * Created by Rabbit on 2017/5/16.
 */
'use strict';
import RNFetchBlob from 'react-native-fetch-blob';
/***
 * import { fetch } from '../Fetch';
 *
 */

const Header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};
let Config = {
    indicator:true,
};

export async function get(url, successCallBack, failCallBack) {
    try {
        let data = await RNFetchBlob.config(Config).fetch('GET',url,Header);
        if (data.respInfo.status === 200){
            successCallBack(await data.json());
        }else {
            failCallBack(data.json());
        }
    } catch (error){
        console.log(error);
        failCallBack(error);
    }
}

export async function post(url, body, successCallBack, failCallBack) {
    Header.body = JSON.stringify(body);

    try {
        let data = await RNFetchBlob.config(Config).fetch('POST',url,Header);
        if (data.respInfo.status === 200){
            successCallBack(await data.json());
        }else {
            failCallBack(data.json());
        }
    } catch (error){
        console.log(error);
        failCallBack(error);
    }
}


