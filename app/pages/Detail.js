/**
 * Created by Rabbit on 2017/4/19.
 */
/**
 * Created by Rabbit on 2017/4/19.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView,
    InteractionManager
} from 'react-native';

import Button from '../component/Button';


import ProgressBarAnimated from '../component/ProgressBarAnimated';

import {NavigationActions} from 'react-navigation'
let WEBVIEW_REF = 'webview';
const setParamsAction = NavigationActions.setParams({
    params: {
        name: 'hahah',
        title: 'hahaha',
    },
    title: 'hahaha',
    key: 'screen-123',
});

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'SearchHistory', params: {
                isVisible: false,
            }
        })
    ]
});

export default class Detail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            isProgress: false,
        }
    }

    componentDidMount() {
        console.log(this.props.navigation);
    }

    componentWillUnmount() {
        this.setIntervar && clearInterval(this.setIntervar);
    }

    _onNavigationStateChange = (navState) => {
        console.log(navState);
    };

    renderLoading = () => {

    };
// <TouchableOpacity onPress={()=>this.props.navigation.dispatch(setParamsAction)}>
// <Text>1111</Text>
// </TouchableOpacity>

    render() {
        const {state: {params: {data, title}}} = this.props.navigation;
        let url = "http://image.baidu.com/wiseshitu?guess=1&" +
            "uptype=upload_wise&queryImageUrl=http://oo6mt5wjj.bkt.clouddn.com/" +
            "ba4ae069-b6fa-4d3c-9a75-d5ce59a3973d.jpeg&querySign=&simid=";
        // console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                <ProgressBarAnimated
                    progress={this.state.progress}
                    style={{
                            height:20,
                            width:SCREEN_WIDTH,
                            borderWidth:0,
                            borderRadius:0,
                            }}
                    filledColor='#4ECBFC'
                    unfilledColor='#F5FCFF'
                />
                <WebView
                    ref={WEBVIEW_REF}
                    style={styles.webView}
                    source={{uri:url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={false}
                    onNavigationStateChange={this._onNavigationStateChange}
                    renderLoading={this.renderLoading}
                    startInLoadingState={true}
                    onLoadStart={()=>{
                        console.log('开始加载');
                        this.setState({
                            progress:0,
                        });
                        this.setIntervar = setInterval(()=>{
                            if (this.state.progress > 80){
                                return;
                            }
                            this.setState({
                                progress:this.state.progress + 0.1,
                            });
                        });
                    }}
                    onLoad={()=>{
                        console.log('加载完成');
                    }}
                    onLoadEnd={()=>{
                        console.log('加载结束，成功或失败都会走到这里');
                        this.setState({
                            progress:100,
                        });
                        this.setIntervar && clearInterval(this.setIntervar);
                    }}
                    onError={()=>{
                        console.log('加载失败');
                    }}
                />
                <View style={styles.bottomViewStyle}>
                    <Button onPress={()=>{
                        console.log('点击');
                         this.refs[WEBVIEW_REF].goBack();
                    }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    webView: {
        height: SCREEN_HEIGHT - 20,
        width: SCREEN_WIDTH,
        // backgroundColor:'white',
        // position:'absolute',
        // top:-49
    },
    bottomViewStyle:{
        width:SCREEN_WIDTH,
        height:49,
        backgroundColor:'red',
        flexDirection:'row'
    }
});