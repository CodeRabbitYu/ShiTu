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
    // static navigationOptions = {
    //
    //     header: ({ state, setParams ,goBack}) => {
    //         // const { navigate } = this.props.navigation;
    //
    //         // console.log(state);
    //         // console.log(setParams);
    //          let right = (
    //             <TouchableOpacity>
    //                 <Text onPress={() => {
    //                     const { navigate } = this.props.navigation;
    //                     {/*navigate('ShiTu');*/}
    //                 }}>
    //                     哈哈
    //                 </Text>
    //             </TouchableOpacity>
    //         );
    //         return{right};
    //     },
    // };

    _right = ()=> {
        const { navigate } = this.props.navigation;
        // console.log(navigate);
        console.log(this.props.navigation);
        navigate('ShiTu')
    };

    render() {
        const { state: { params: { data } } } = this.props.navigation;
        console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.webView}
                    source={{uri:data,method: 'GET'}}
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
    webView:{
        height:SCREEN_HEIGHT-20,
        width:SCREEN_WIDTH,
        backgroundColor:'white',
        position:'absolute',
        top:-49
    }
});