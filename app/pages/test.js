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
        NavigationActions.navigate({ routes:[{index:'0'}]})
    ]
});


export default class Login extends Component {

    static navigationOptions = {
        
    }

    componentDidMount(){
    }

    _registerPress(){
        console.log('注册');
        // this.props.navigate('SearchHistory',{
        //     title:'搜索历史',
        // });
    }

    _resetPress () {
        console.log('重置');
        this.props.navigation.dispatch(resetAction)

    }

    _closePress (){
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='保存' onPress={()=>this._savePress()} />
                <Button title='获取' onPress={()=>this._getPress()} />
                <Button title='注册' onPress={()=>this._registerPress()} />
                <Button title='reset' onPress={()=>this._resetPress()} />
                <Button title='关闭' onPress={()=>this._closePress()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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


