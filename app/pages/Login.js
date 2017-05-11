/**
 * Created by Rabbit on 2017/5/10.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Button
} from 'react-native';

export default class Login extends Component {
    componentDidMount(){
    }

    _savePress = () => {
        console.log('点击按钮');
        AsyncStorage.setItem('TOKEN', 'Super Man' ,(error)=>{
            if (error){
                console.log('存储失败' + error);
            }else {
                console.log('存储成功');

            }
        })
    };
    _getPress() {
        console.log('取出数据');
        let data = AsyncStorage.getItem('TOKEN');
        console.log(data);

        if (data){
            console.log('登录成功');
            return true;
        }else {
            console.log('尚未登录');
            return false;
        }
    };
    _removePress (){
        let key = 'TOKEN';
        AsyncStorage.removeItem(key);
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title='保存' onPress={this._savePress}></Button>
                <Button title='获取' onPress={()=>this._getPress()}></Button>
                <Button title='删除' onPress={()=>this._removePress()}></Button>
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

AppRegistry.registerComponent('ShiTu', () => ShiTu);
