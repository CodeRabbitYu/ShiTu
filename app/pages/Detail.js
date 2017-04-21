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
        title: 'Detail',
        header: {
            visible: true,
            titleStyle:{fontSize:22},
        },
        header: ({ state, setParams ,goBack}) => {
            // console.log(state);
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
        const { state: { params: { data } } } = this.props.navigation;
        console.log(data);
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