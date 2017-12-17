/**
 * Created by Rabbit on 2017/7/8.
 */

import React, { Component ,PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AppState,
    Button
} from 'react-native';

export default class TestItem extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        callBackPress: PropTypes.object,
    };

    state = {
        title:this.props.title
    }
    
    onPress = () => {
        if(this.props.callBackPress){
            this.props.callBackPress('使用Callback修改父状态，有返回值');
        }
    }

    render() {
        return (
            <View>
                <Button onPress={this.onPress} title={this.props.title} />
            </View>
        );
    }
}