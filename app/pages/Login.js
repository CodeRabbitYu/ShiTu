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

import { NavigationActions } from 'react-navigation'
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'ShiTu'})
    ]
});


export default class Login extends Component {



    componentDidMount(){
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='保存' onPress={()=>this._savePress()} />
                <Button title='获取' onPress={()=>this._getPress()} />
                <Button title='删除' onPress={()=>this._removePress()} />
                <Button title='登录' onPress={()=>this._loginPress()} />
                <Button title='关闭' onPress={this.props.closeClick} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

Login.PropTypes = {
    navigate:React.PropTypes.object,
    closeClick:React.PropTypes.object,
};


