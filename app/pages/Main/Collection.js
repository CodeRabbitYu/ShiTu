/**
 * Created by Rabbit on 2017/7/6.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AppState
} from 'react-native';

export  default  class Collection extends Component {
    constructor(props){
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>
            </View>
        );
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