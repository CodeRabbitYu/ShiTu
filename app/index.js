/**
 * Created by Rabbit on 2017/4/19.
 */
import { AppRegistry,View } from 'react-native';
import React, { Component } from 'react';
import App from './APP';
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}


export default class Root extends Component {
    render() {
        return (
           <App screenProps={'hahah'}/>
        );
    }
};


console.ignoredYellowBox = ['Warning: BackAndroid is deprecated.  Please use BackHandler instead.'];
// global.BASEURL = 'hahaha';
// 关闭全部的警告
//console.disableYellowBox = true;
// 关闭指定的警告
//console.warn('YellowBox is disabled.');
AppRegistry.registerComponent('ShiTu', () => Root);