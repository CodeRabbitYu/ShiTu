/**
 * Created by Rabbit on 2017/12/17.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';

export default class BaseClass extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    fullName() {
        return 'test'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>12313131231313</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH,
        backgroundColor:'orange'
    },
});