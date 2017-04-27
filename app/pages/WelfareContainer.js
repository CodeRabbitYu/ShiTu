/**
 * Created by Rabbit on 2017/4/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Reqeust from '../common/Request';
import Config from '../common/Config';

export default class WelfareContainer extends Component {
    componentDidMount() {
        // let url = 'http://gank.io/api/data/拓展视频/10/1'
        let type = encodeURIComponent(this.props.type);

        let url = `${Config.api.getGankData}?page=${1}&type=${type}`
        console.log(url);

        // let url = `http://gank.io/api/data/${this.props.type}/20/1`
        Reqeust.get(url,(data)=>{
            console.log(data);
        },(error)=>{
            console.log(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

