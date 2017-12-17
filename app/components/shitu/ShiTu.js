/**
 * Created by Rabbit on 2017/12/16.
 */

import React, {Component} from 'react';
import {
    // StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import { StyleSheet } from '../../common/StyleSheet'

export default class ShiTu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    layout=(e)=>{  console.log(e)  }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.viewStyle} onLayout={({nativeEvent:e})=>this.layout(e)}>
                </View>
            </View>
        );
    }
}


const flatten = StyleSheet.flatten({
    fff:{
        height:100
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:100,
        // width:30
    },
    viewStyle:{
        height:300,
        width:300,
        backgroundColor:'blue'
    }
});