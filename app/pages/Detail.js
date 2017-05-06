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

import ProgressBarAnimated from '../component/ProgressBarAnimated';

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
        }
    }

    componentWillUnmount(){
        this.setIntervar && clearInterval(this.setIntervar);
    }

    _onNavigationStateChange = (navState)=> {
        console.log(navState);
    };

    _renderLoading = ()=>{
        return(
            <ProgressBarAnimated
                progress={this.state.progress}
                style={{
                        height:5,
                        width:SCREEN_WIDTH,
                        borderWidth:0,
                        borderRadius:0,

                    }}
                filledColor='#4ECBFC'
                unfilledColor='white'
            />
        )
    };

    render() {
        const { state: { params: { data,title } } } = this.props.navigation;
        // console.log(title);
        let url = "http://image.baidu.com/wiseshitu?guess=1&" +
            "uptype=upload_wise&queryImageUrl=http://oo6mt5wjj.bkt.clouddn.com/" +
            "ba4ae069-b6fa-4d3c-9a75-d5ce59a3973d.jpeg&querySign=&simid=";
        // console.log(this.props.navigation);
        return (
            <View style={styles.container}>

                <WebView
                    style={styles.webView}
                    source={{uri:url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={false}
                    onNavigationStateChange={this._onNavigationStateChange}
                    renderLoading={this._renderLoading}
                    startInLoadingState={true}
                    onLoadStart={()=>{
                        console.log('开始加载');
                        this.setIntervar=setInterval(()=>{
                            this.setState({
                                progress:this.state.progress + 1,
                            });
                        });
                    }}
                    onLoadEnd={()=>{
                        this.setState({
                                progress:100,
                            });
                    }}
                />
            </View>
        );
    }
    _onPress = ()=>{
        setTimeout(()=>{
            this.setState({
                progress:this.state.progress +1
            });
        },1000);
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
        // backgroundColor:'white',
        // position:'absolute',
        // top:-49
    }
});