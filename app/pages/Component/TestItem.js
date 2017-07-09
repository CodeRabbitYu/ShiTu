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
        press: PropTypes.object,
    };

    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
                <Button onPress={this.props.press} title='点击我' />
            </View>
        );
    }
}