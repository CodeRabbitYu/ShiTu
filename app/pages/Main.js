/**
 * Created by Rabbit on 2017/4/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Button from '../component/Button';

export default class Main extends Component {

    render() {
        // console.log('Main');
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={() => navigate('Gank')}>
                    Welcome to React Native!
                </Text>
                <Button
                    title='搜索历史'
                    onPress={()=>{
                        console.log('搜索历史');
                        navigate('SearchHistory',{
                            title:'搜索历史'
                        });
                    }}/>
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
