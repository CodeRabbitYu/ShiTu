/**
 * Created by Rabbit on 2017/6/26.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AppState,
    Image,
    TextInput,
    FlatList
} from 'react-native';

import TestItem from './TestItem';

export  default  class App extends Component {

    // http://shitu.leanapp.cn/api/gank/listData?page=1&count=10&type=iOS

    static navigationOptions = {
        tabBarVisible:false,
        header:null,
    }

    constructor(props){
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
            dataSource:[]
        };
    }

    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    componentDidMount() {
        Fetch.get('http://shitu.leanapp.cn/api/gank/listData?page=1&count=10&type=iOS',(data)=>{
            console.log(data);

            let results = data.data.results;

            this.setState({
                dataSource : results,
            })

        }, (error)=>{
            console.log(error);
        })
    }

    render() {
        return (
                <FlatList
                    style={{backgroundColor:'#F5F5F5'}}
                    data={this.state.dataSource}
                    keyExtractor={item => item._id}
                    removeClippedSubviews={ false }
                    renderItem={({item})=><Text style={{height:100,width:SCREEN_WIDTH,backgroundColor:'red'}}>1231313</Text>}
                />
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
        // flex: 1,
        // marginTop:25
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