/**
 * Created by Rabbit on 2017/4/19.
 */
import { AppRegistry,View,Text,BackHandler} from 'react-native';

import React, { Component } from 'react';

import {Provider}from 'react-redux';

import configureStore from './store/ConfigureStore';
import { toastShort } from './common/ToastUtils'
const store = configureStore();
let lastClickTime = 0;
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
    constructor(props){
        super(props);
        this.state = {
            isLogin:false
        }
    }
    componentDidMount() {
        if (Android){
            BackHandler.addEventListener('handwareBackPress',this.onBackAndroid)
        }
    }
    componentWillUnmount() {
       if (Android){
            BackHandler.addEventListener('handwareBackPress',this.onBackAndroid)
        }
    }


    onBackAndroid=()=>{
        let now = new Date().getTime();
        if (now - lastClickTime < 2500 ){
            return false;
        }
        lastClickTime = now ;
        toastShort('再按一次退出应用');
        return true;
    }
    render() {
        return (
            !this.state.isLogin ?
                <Provider store={store}>
                    <App />
                </Provider>
                :
                <View style={{marginTop:30}}>
                    <Text onPress={()=>{
                        this.setState({
                            isLogin:true
                        })
                    }}>
                        点我登录
                    </Text>
                </View>
        );
    }
};


console.ignoredYellowBox = ['Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
'source.uri should not be an empty string'
];
// global.BASEURL = 'hahaha';
// 关闭全部的警告
//console.disableYellowBox = true;
// 关闭指定的警告
//console.warn('YellowBox is disabled.');
AppRegistry.registerComponent('ShiTu', () => Root);