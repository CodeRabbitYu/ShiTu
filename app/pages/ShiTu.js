/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Gank from './Gank';
export default class ShiTu extends Component {
    static navigationOptions = {
        title: '识兔',
        tabBar:{
            label: ' ',
            icon: ({ tintColor }) => (
                <Image
                    source={{uri : 'rabbit'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
        header: {
            visible: true,
            titleStyle:{fontSize:20},
        },
    };

    push = () => {

    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={() => navigate('Detail', {
                    callback: (data) => {
                      this.setState({
                        childState: data
                      })
                    }
                  })}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get starteds, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    icon:{
        width:35,
        height:35,
    }
});

