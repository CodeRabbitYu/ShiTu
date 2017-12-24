/**
 * Created by Rabbit on 2017/12/16.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';


import Immutable from 'immutable';

import { Button, Label } from 'teaset';

import * as Animatable from 'react-native-animatable';
AnimatableButton = Animatable.createAnimatableComponent(View);
AnimatableText = Animatable.createAnimatableComponent(Text);


import FastImage from 'react-native-fast-image'

// import { StyleSheet } from '../../common/StyleSheet'

export default class ShiTu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    layout=(e)=>{
        // console.log(e)
    }

    componentDidMount() {

        const alpha = Immutable.Map({ a: 1, b: 2, c: 3, d: 4 });
        console.log(alpha)
        alpha.map((v, k) =>{
            k.toUpperCase()
            // console.log(k);
            // console.log(k);
        }).join();

        // const map1 = Immutable.Map({ a: 1, b: 2, c: 3 })
        // const clone = map1;
        // console.log(clone);


        // const myObject = { a: 1, b: 2, c: 3 }
        // Immutable.Seq(myObject).map(x =>
        //     x * x
        // ).toObject();

        // console.log(JSON.stringify(alpha));


        let url = 'https://api.shunliandongli.com/v1/home/all.json';

        // url = 'http://shitu.leanapp.cn/api/userToken'

        url = 'http://39.106.51.210/laravel5.5/public/test';

        let config = {
            timeout: 9999,
            // indicator: true,
        };

        let header = {
            'User-Agent' : 'ShunLian iPhone 9.0.1/1.0.0',
            'X-Device-ID' : 'FC1D511A-70FA-4ABC-8E7A-F1AACCBF9BAA',
            'Accept-Encoding' : 'gzip,deflate',
            'X-Ip' : '192.168.1.1',
        }

        // let params = {
        //     a:'1',
        // };


        RTRequest.get( url, null, header )
            .then((data)=>{
                console.log(data);
            })
            .catch((error)=>{
                console.log(error.msg);
            })


        // RTRequest.fetch({url, method:'get', header:Header, config})
        //     .then(data=>{
        //       console.log(data)
        //     })
        //     .catch(error=>{
        //         console.log(error.msg);
        //     })

        // RTRequest.fetch( {url, method:'post', header:Header, config, params}, (data)=>{
        //     console.log(data);
        // }, (error)=>{
        //     console.log(error)
        // })

        // RTRequest.fetch('get', url, null, (response)=>{
        //     // console.log(response);
        //
        //     let data = response.data;
        //
        //     const map1 = Immutable.List( data.banner );
        //     // const map2 = map1.set('b', 50);
        //
        //     map1.toArray().map(item => {
        //         console.log(item);
        //     })
        //
        //     console.log(map1.toObject())
        //     // console.log(map1.get('b') + " vs. " + map2.get('b'))
        //
        //
        // }, (error)=>{
        //     console.log(error);
        // }, config, Header);
    }


    _immutable = () => {

    }

    render() {
        return (
            <ImageBackground style={styles.container}
                             source={require('../../resources/timg.jpeg')}
                             blurRadius={10}
            >
                {/*<View style={styles.viewStyle} onLayout={({nativeEvent:e})=>this.layout(e)} />*/}
                {this._immutable()}

                <FastImage
                    style={{height:300,width:300}}
                    source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers:{ Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.center}
                />
                    <Label text={'123123'}/>
                    <AnimatableButton animation="bounceInLeft"
                                      useNativeDriver
                    >
                        <Button onPress={()=>alert('123')} title={'点我'}
                                style={{backgroundColor:'red',width:200,height:44}}
                        />
                    </AnimatableButton>

            </ImageBackground>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',

    },
    viewStyle:{
        height:300,
        width:300,
        backgroundColor:'blue'
    }
});