/**
 * Created by Rabbit on 2017/4/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class WelfareItem extends Component {
    static defaultProps = {
        itemData: {},
    };

    componentDidMount() {
        console.log(this.props.itemData);
    }

    render() {
        const { state: { params: { url } } } = this.props.navigation;
        return (
            <Image
                source={{uri:url}}
                style={{
                    height:SCREEN_HEIGHT,
                    width:SCREEN_WIDTH}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

