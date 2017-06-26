/**
 * Created by Rabbit on 2017/6/26.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AppState
} from 'react-native';

export  default  class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
        };
    }

    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.item}>监听中...{this.state.currentAppState}</Text>
            </View>
        );
    }

    _handleAppStateChange = (nextAppState) => {
        //应用程序出现在前台
        console.log(nextAppState);
        if (this.state.currentAppState.match(/inactive|background/)) {
            console.log('在前台?');
            this.timer && clearTimeout(this.timer);
            alert("clearTimeout");
        }else{
            console.log('在后台?')
            this.timer = setTimeout(() => {
                    alert("已经超时..........");
                }, 5000);
        }
        this.setState({currentAppState: nextAppState});
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop:25
    },
    item:{
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        height:30,
        borderWidth:1,
        padding:6,
        borderColor:'#ddd',
        textAlign:'center'
    },
});