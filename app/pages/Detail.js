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
    TouchableOpacity,
    WebView
} from 'react-native';
import ShiTu from './ShiTu';
export default class Detail extends Component {
    static navigationOptions = {
        // title: '识图详情',
        // header: {
        //     visible: false,
        //     titleStyle:{fontSize:22},
        // },
        header: ({ state, setParams ,goBack}) => {
            // const { navigate } = this.props.navigation;

            // console.log(state);
            // console.log(setParams);
             let right = (
                <TouchableOpacity>
                    <Text onPress={() => {
                        const { navigate } = this.props.navigation;
                        {/*navigate('ShiTu');*/}
                    }}>
                        哈哈
                    </Text>
                </TouchableOpacity>
            );
            return{right};
        },
        mode:'modal',
    };

    _right = ()=> {
        const { navigate } = this.props.navigation;
        // console.log(navigate);
        console.log(this.props.navigation);
        navigate('ShiTu')
    };

    render() {
        const { state: { params: { data } } } = this.props.navigation;
        return (
            <View style={styles.container}>
                <WebView
                    style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT-20,backgroundColor:'white'}}
                    source={{uri:data.data,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
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
    webView:{
        height:SCREEN_HEIGHT,
        width:SCREEN_WIDTH
    }
});