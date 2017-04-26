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
    static navigationOptions = {
        title: '个人中心',

        header: {
            // bool值，header是否可见。
            visible: true,
            // header的title的style
            titleStyle:{fontSize:22,color:'red'},
            // header的style
            style:{backgroundColor:'white'},
            // 返回按钮在iOS平台上，默认是title的值
            // backTitle
        },
        // cardStack- 配置card stack
        // gesturesEnabled- 是否允许通过手势关闭该界面，在iOS上默认为true，在Android上默认为false
    };
    render() {
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
