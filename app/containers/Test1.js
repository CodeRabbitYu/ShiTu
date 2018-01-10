/**
 * Created by Rabbit on 2017/12/29.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Axios, Fetch } from '../Request';

import axios from 'axios';

export default class Test1 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    getUserToken1 = () => {
        return Axios.get('http://shitu.leanapp.cn/api/userToken');
        // return Axios.get('/userToken')
        //     .then((data)=>{
        //         console.log(data);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     })
    }

    getUserToken2 = () =>{
        return axios.get('http://shitu.leanapp.cn/api/userToken');
    }
    getUserToken3 = () =>{
        return axios.get('http://shitu.leanapp.cn/api/userToken');
    }

    postLogin = () => {
        let params = {
            username:'17123456789',
            verifyNumber:'875858',
        };
        return Axios.post('/user/login',params,{
            timeout:2000
        })
            .then((data)=>{
                console.log(data);
            })
            .catch((error)=>{
                console.log(error);
            })

    }

    componentDidMount() {
        // console.log(Actions);

        // let params = {
        //     a:1,
        //     b:2,
        // }

        Axios.headers = {
            'User-Agent': 'ShunLian iPhone 9.0.1',
            'X-Device-ID': 'FC1D511A-70FA-4ABC-8E7A-F1AACCBF9BAA',
            'Accept-Encoding': 'gzip, deflate',
            'X-Ip': '192.168.1.1',
        };

        let params = {
            type:'iOS',
            count:'20',
            page:'1',

        };

        // axios.all([this.getUserToken1(), this.postLogin()])
        //     .then(axios.spread((a,b,c)=>{
        //         console.log(a);
        //         console.log(b);
        //         // console.log(c);
        //     }))
        //     .catch((error)=>{
        //         console.log(error);
        //     })

        this.postLogin();


        // Axios.post('/user/login',params)
        //     .then((data)=>{
        //         console.log(data);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     })

        // '/userToken'
        //

        // http://gank.io/api/data/Android/10/1

        // Axios.get('/gank/listData', {
        //     params,
        //     timeout: 2000
        // })
        //     .then((data)=>{
        //         console.log(data);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     })

        // Axios.get('/gank/listData', params, {timeout: 2000})
        //     .then((data)=>{
        //     console.log(data);
        //     })
        //     .catch((error)=>{
        //     console.log(error);
        //     })

    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>Actions.Test2()}>
                    <Text >
                        1233123
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});