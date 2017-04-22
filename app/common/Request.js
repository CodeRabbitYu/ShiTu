/**
 * Created by Rabbit on 2017/4/21.
 */
'use strict';

import RNFetchBlob from 'react-native-fetch-blob';

const Request = {
    config:{},
    get:(url, successCallBack, failCallBack) =>{
        console.log(url);
        // console.log(config);
        return RNFetchBlob
            .config(Request.config)
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
    upload:(url,successCallBack,failCallBack) => {

    }
};

module.exports = Request;
