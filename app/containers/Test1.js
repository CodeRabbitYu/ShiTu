/**
 * Created by Rabbit on 2017/12/29.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Test1 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        console.log(Actions);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>Actions.Test2()}>
                    <Text >
                        1233123
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});