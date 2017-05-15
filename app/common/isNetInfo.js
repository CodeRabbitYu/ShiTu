/**
 * Created by Rabbit on 2017/5/15.
 */
'use strict';

import React,{
    NetInfo
} from 'react-native';

export function isNetworkConnected() {
    return NetInfo.fetch().then(reachability => {
        if (reachability === 'unknown') {
            return new Promise(resolve => {
                const handleFirstConnectivityChangeIOS = isConnected => {
                    NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChangeIOS);
                    resolve(isConnected);
                };
                NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChangeIOS);
            });
        }
        reachability = reachability.toLowerCase();
        return (reachability !== 'none' && reachability !== 'unknown');
    });
}