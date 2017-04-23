/**
 * Created by Rabbit on 2017/4/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import Detail from './Detail';

export default class Main extends Component {
    static navigationOptions = {

        header: {
            // bool值，header是否可见。
            visible: true,
            // header的title的style
            titleStyle:{fontSize:22,color:'red'},
            // header的style
            style:{backgroundColor:'white'},
            // 返回按钮在iOS平台上，默认是title的值
            // backTitle
        },
        // cardStack- 配置card stack
        // gesturesEnabled- 是否允许通过手势关闭该界面，在iOS上默认为true，在Android上默认为false
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={() => navigate('Detail', {
                                data: '',
                            })}>
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
        justifyContent: 'center',
        alignItems: 'center',
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
