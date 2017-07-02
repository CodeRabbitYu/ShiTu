/**
 * Created by Rabbit on 2017/6/29.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Button,
    InteractionManager,
    TouchableOpacity
} from 'react-native';

import RTTextInput from '../../component/RTTextInput';

export default class Register extends Component {

    static navigationOptions = {
        headerTitle:'注册'
    }

    componentDidMount(){
    }

    constructor(props){
        super(props);
        this.state = {
            accountStatus:true,
            passWordStatus:true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RTTextInput placeholder="账号"
                             status={this.state.accountStatus}
                             onChangeText={(text) =>this._usernameJudge(text)}
                             ref={(input) => this._usernameInput = input}
                             textInputRef='textInput'
                             iconName='md-person'
                />
                <RTTextInput placeholder="密码"
                             status={this.state.passWordStatus}
                             onChangeText={(text) =>this._usernameJudge(text)}
                             ref={(input) => this._usernameInput = input}
                             textInputRef='textInput'
                             iconName='md-lock'
                />
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});


