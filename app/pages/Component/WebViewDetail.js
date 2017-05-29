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

import ProgressBar from '../../component/ProgressBar';

import { NavigationActions } from 'react-navigation'

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { Container, Content, Button, Spinner, Fab,} from 'native-base';

const WEBVIEW_REF = 'webview';

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
        const {state: {params: {data}}} = this.props.navigation;
        console.log(data);
        let url = "http://image.baidu.com/wiseshitu?guess=1&" +
            "uptype=upload_wise&queryImageUrl=http://oo6mt5wjj.bkt.clouddn.com/" +
            "ba4ae069-b6fa-4d3c-9a75-d5ce59a3973d.jpeg&querySign=&simid=";
        this.state = {
            progress: 0,
            active:true,
            isGoBack:false,
            isForWard:false,
            url:data,
        }
    }

    componentDidMount() {
        // console.log(this.props.navigation);
    }

    componentWillUnmount() {
        this.setIntervar && clearInterval(this.setIntervar);
    }

    _onNavigationStateChange = (navState) => {
        this.setState({
            isGoBack: navState.canGoBack,
            isForWard: navState.canGoForward,
            url:navState.url,
        });
    };

    renderLoading = () => {

    };

// <TouchableOpacity onPress={()=>this.props.navigation.dispatch(setParamsAction)}>
// <Text>1111</Text>
// </TouchableOpacity>

    _reload = ()=> {
        console.log('刷新');
        this.refs[WEBVIEW_REF].reload();
    };
    _goForward = ()=> {
        console.log('去前面的页面');
        this.refs[WEBVIEW_REF].goForward();
    };

    _goBack = ()=> {
        console.log('返回上级页面');
        this.refs[WEBVIEW_REF].goBack();
    };

    _close = ()=> {
        console.log('关闭');
        const {goBack} = this.props.navigation;
        goBack();
    };

    _renderActionButton = () =>{
        return(
            <ActionButton buttonColor="rgba(231,76,60,1)"
                // 是否自动打开
                          active={iOS?false:this.state.active}
                // 是否展示阴影
                          hideShadow={iOS?true:true}
                          position="right"
                          spacing={-5}
                          offsetY={15}
                          offsetX={15}
                          outRangeScale={1}
                          autoInactive={false}
                          onPress={()=>{console.log('点击Action了')}}
            >
                <ActionButton.Item buttonColor={'#F8D168'}
                                   style={styles.actionItemStyle}
                                   onPress={this._reload}>
                    <Icon name="ios-refresh-outline" style={[styles.actionButtonIcon,{fontSize:25}]}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={this.state.isForWard ?'#1abc9c' : '#dddddd'}
                                   onPress={this._goForward}
                                   style={styles.actionItemStyle} >
                    <Icon name="ios-arrow-forward-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor={this.state.isGoBack ?'#3498db' : '#dddddd'}
                                   onPress={this._goBack}
                                   style={styles.actionItemStyle}>
                    <Icon name="ios-arrow-back-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#9b59b6'
                                   style={styles.actionItemStyle}
                                   onPress={this._close}>
                    <Icon name="md-close-circle" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        )
    }

    render() {

        // console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                <ProgressBar
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
                    source={{uri:this.state.url,method: 'GET'}}
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
                            active:false,
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
                            // active:true
                        });
                        this.setIntervar && clearInterval(this.setIntervar);
                    }}
                />
                {this._renderActionButton()}
                {


                    !this.state.progress === 100
                        ?
                        this._renderActionButton()
                        :
                        null

                }
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

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
        alignSelf:'center',
        alignItems:'center',
    },
    actionItemStyle:{
        height:40,
        width:40,

    }
});