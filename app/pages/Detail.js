/**
 * Created by Rabbit on 2017/4/19.
 */
/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import ShiTu from './ShiTu';
export default class Detail extends Component {
    static navigationOptions = {
        title: 'Detail',
        header: {
            visible: true,
            titleStyle:{fontSize:22},
        },
        header: ({ state, setParams ,goBack}) => {
            // console.log(state);
            console.log(setParams);
            let right = (
                <TouchableOpacity>
                    <Text onPress={() => goBack('ShiTu')}>
                        返回
                    </Text>
                </TouchableOpacity>
            );
            return{right};
        },
        mode:'modal',
    };


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
});