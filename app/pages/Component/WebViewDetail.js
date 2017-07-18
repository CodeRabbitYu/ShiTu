/**
 * Created by Rabbit on 2017/4/19.
 */
/**
 * Created by Rabbit on 2017/4/19.
 */
import React, {Component,PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView,
    InteractionManager,
    BackHandler
} from 'react-native';

import ProgressBar from '../../component/ProgressBar';

import { NavigationActions } from 'react-navigation'

import ActionButton from 'react-native-action-button';
import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';


import { Container, Content, Spinner, Fab,} from 'native-base';

const WEBVIEW_REF = 'webview';

class WebViewDetailDetail extends PureComponent {

    static navigationOptions = ({navigation,screenProps}) => ({
        // headerTitle:navigation.state.params?navigation.state.params.title:null,
        gesturesEnabled:false,
    });
    constructor(props) {
        super(props);
        const {state: {params: {data}}} = this.props.navigation;
        console.log(data);
        this.state = {
            progress: 0,
            active:true,
            isGoBack:false,
            isForWard:false,
            url:data,
        }
    }

    onBackAndroid = ()=> {

        const {routes} = this.props;
        console.log(routes);
        // alert(routes)
        if (routes.length > 1) {
            this.props.navigation.goBack();
            return true;
        }
    }

    componentDidMount() {
        // console.log(this.props.navigation);

        BackHandler.addEventListener('handlerBackDetail',this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.addEventListener('handlerBackDetail',this.onBackAndroid);
        this.setIntervar && clearInterval(this.setIntervar);
    }

    _onNavigationStateChange = (navState) => {
        // console.log(navState);
        // 可以跳转新页面，但这个只是测试代码
        // if(navState.url !== this.state.url){
        //     // this.props.navigation.navigate('')
        //     this.props.navigation.navigate('WebViewDetail', {
        //         data: navState.url,
        //         isVisible: true
        //     });
        // }

        console.log('onNavigationStateChange');
        this.setState({
            isGoBack: navState.canGoBack,
            isForWard: navState.canGoForward,
            url:navState.url,
        });
    };

    _renderLoading = () => {
        return(
            Android?
                <ProgressBar
                    progress={this.state.progress}
                    style={{
                                    height:iOS?20:5,
                                    width:SCREEN_WIDTH,
                                    borderWidth:0,
                                    borderRadius:0,
                                    backgroundColor:'gray',
                                }}
                    //filledColor='#4ECBFC'
                    //unfilledColor='#F5FCFF'
                    filledColor="#C9DE00"
                    unfilledColor="white"
                />
                :null
        )
    };

    _reload = ()=> {
        console.log('刷新');
        this.refs[WEBVIEW_REF].reload();
    };
    _goForward = ()=> {
        console.log('去前面的页面');
        this.state.isForWard ? this.refs[WEBVIEW_REF].goForward() :null;
    };

    _goBack = ()=> {
        console.log('返回上级页面');
        this.state.isGoBack ? this.refs[WEBVIEW_REF].goBack() : null;
    };

    _close = ()=> {
        console.log('关闭');
        const {goBack} = this.props.navigation;
        goBack(null);
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
                <ActionButton.Item buttonColor={'#9b59b6'}
                                   style={styles.actionItemStyle}
                                   onPress={this._close}>
                    <Icon name="md-close-circle" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        )
    };

    _renderBottomView = () => {
        return(
            <View style={styles.bottomViewStyle}>
                <TouchableOpacity style={[styles.bottomButtonStyle,{backgroundColor:'#F8D168'}]}
                                  activeOpacity={1} onPress={this._reload}>
                    <Icon name="md-refresh"
                          backgroundColor="#3b5998"
                          size={25}
                          style={styles.bottomIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButtonStyle,
                {backgroundColor:this.state.isGoBack ?'#3498db' : '#dddddd'}]}
                                  activeOpacity={1} onPress={this._goBack}>
                    <Icon name="md-arrow-round-back"
                          backgroundColor="#3b5998"
                          size={25}
                          style={styles.bottomIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButtonStyle,
                {backgroundColor:this.state.isForWard ?'#1abc9c' : '#dddddd'}]}
                                  activeOpacity={1} onPress={this._goForward}>
                    <Icon name="md-arrow-round-forward"
                          size={25}
                          style={styles.bottomIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButtonStyle,{backgroundColor:'#3b5998'}]}
                                  activeOpacity={1} onPress={this._close}>
                    <Icon name="md-close"
                          size={25}
                          style={styles.bottomIconStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }

// <Button isCustom={true}
//     style={[styles.bottomButtonStyle,
// {backgroundColor:'#9b59b6'}]}
// activeOpacity={1}
// underlayColor='#9b59b6'
// customView={
//     <Icon name="md-close"
// size={25}
// style={styles.bottomIconStyle}/>
// }
// onPress={this._close}
// />

    _onShouldStartLoadWithRequest = (data)=>{
        console.log(data);
        return true;
    }

    render() {

        // console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                {
                    iOS?
                        <ProgressBar
                            progress={this.state.progress}
                            style={{
                                    height:iOS?20:5,
                                    width:SCREEN_WIDTH,
                                    borderWidth:0,
                                    borderRadius:0,
                                    backgroundColor:'gray',
                                }}
                            filledColor='#4ECBFC'
                            unfilledColor='#F5FCFF'

                        />
                    :null
                }

                <WebView
                    ref={WEBVIEW_REF}
                    style={styles.webView}
                    source={{uri:this.state.url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={false}
                    onNavigationStateChange={this._onNavigationStateChange}
                    renderLoading={this._renderLoading}
                    startInLoadingState={true}
                    onShouldStartLoadWithRequest={()=>this._onShouldStartLoadWithRequest()}
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

                            if (this.state.progress >= 100){
                                this.setIntervar && clearInterval(this.setIntervar);
                            }
                            console.log(this.state.progress);
                        });
                    }}
                    onLoad={()=>{
                        console.log('加载完成');
                    }}
                    onLoadEnd={()=>{
                        console.log('加载结束，成功或失败都会走到这里');
                        this.setIntervar && clearInterval(this.setIntervar);
                        this.setState({
                            progress:100,
                            // active:true
                        });

                    }}
                    onError={()=>{
                        Alert.alert(
                            '加载失败',
                            null,
                            [
                                {text: '刷新', onPress: () => this._reload(),style: 'destructive'},
                                {text: '取消', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
                            ],
                            { cancelable: false }
                        )
                    }}
                />

                {
                    iOS
                        ?
                        this._renderActionButton()
                        :
                        this._renderBottomView()
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
        height: Android ? 200: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        marginTop:Android?24:0,
        // marginBottom:40,
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
    },
    bottomViewStyle:{
        position:'absolute',
        bottom:0,
        height:40,
        width:SCREEN_WIDTH,
        flexDirection:'row',
        flex :1,
    },
    bottomButtonStyle:{
        width:SCREEN_WIDTH/4,
        height:40,
    },
    bottomIconStyle:{
        alignSelf:'center',
        justifyContent:'center',
        marginTop:5,

    }
});

export default connect((state) => {
    const routes  = state.nav.routes;
    return {
        routes
    };
})(WebViewDetailDetail)