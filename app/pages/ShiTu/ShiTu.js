/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
    InteractionManager,
    StatusBar,
    findNodeHandle,
    NetInfo,
} from 'react-native';

import '../../common/Global'
import NetWorkTool from '../../common/NetInfo'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userToken } from '../../actions/ShiTuUserToken';

import { qiNiuToken, getQiNiuToken } from '../../actions/ShiTuQiNiu';
import { backImage,getBackImage } from '../../actions/ShiTuBackImage';

import * as User from '../../actions/ShiTuUserToken';
import * as QiNiu from '../../actions/ShiTuQiNiu';

// import {isNetworkConnected} from '../common/isNetInfo';

import {  View, Text, Image } from 'react-native-animatable';
import Button from '../../component/Button';
const { BlurView ,VibrancyView} = require('react-native-blur');
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import Realm from 'realm';

import RNFetchBlob from 'react-native-fetch-blob';

const HistorySchema = {
    name: 'History',
    primaryKey: 'id',
    properties: {
        id:         'string',
        imageURL:   'string',
        timestamp:  'int',
    }
};

let realm = new Realm({schema: [HistorySchema],});

import Request from '../../common/Request';
import Config from '../../common/Config';

// 底部弹出框文字
let photoOptions = {
    title: '选择照片',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


let perent = '';
let isUpload = false;
let hintText = '点击按钮,搜索你想知道的图片哦!';
let imageUri = 'timg';
@observer
class ShiTu extends Component {

    // // 背景图片地址
    // @observable
    // imageUri='';
    // // 进度条
    // @observable
    // perent='';
    // // 是否正在查找中
    // @observable
    // isUpload=false;
    // @observable
    // hintText= '点击按钮,搜索你想知道的图片哦!';
    @observable
    viewRef = null;


    handleMethod = (isConnected)=> {
        // 检测网络状态
        // console.log('ShiTu', (isConnected ? 'online' : 'offline'));
        NetInfo.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
    };


    componentWillMount(){
        console.log('componentWillMount');
        // this.props.dispatch(userToken());
        iOS
            ?
            NetWorkTool.listenerNetworkState(()=>{
                NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
            })
            :
            NetWorkTool.listenerNetworkState((isConnected)=>{
                console.log(isConnected);
            });


        // console.log(this.props);
        // const {getQiNiuToken} = this.props;
        // getQiNiuToken({name:'1111'});//这里就是触发  action 方法

    }

    componentWillUnmount(){
        this.subscription.remove();
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');

        const { navigate } = this.props.navigation;
        const { imageURL, qiNiuData } = nextProps.ShiTuReducer;

        if (this.props.ShiTuReducer.imageURL !== imageURL){
            if (imageURL) {
                console.log(imageURL);
                imageUri=imageURL;
                this.viewRef = 88;
            }
        }

        if (this.props.ShiTuReducer.qiNiuData !== qiNiuData){
            if (qiNiuData) {
                const { webURL } = qiNiuData.data;
                if (webURL) {
                    navigate('WebViewDetail', {
                        data: webURL,
                        isVisible: true
                    });
                    isUpload = false;
                    hintText = '是否是您寻找的答案呢?'
                }
            }
        }

        // if (this.props.ShiTuReducer !== nextProps.ShiTuReducer) {
        // }
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.props.userToken();

        this.props.backImage();

        // console.log(this.props.ShiTuReducer);

        // NetWorkTool.checkNetworkState((isConnected)=>{
        //     console.log(isConnected);
        // });

        // console.log(list);

        /**
         * 没有使用redux之前获取USERTOKEN的方法
        let KEY = 'USERTOKEN';
        AsyncStorage.getItem(KEY,(Error,result)=>{
            if (result === null){
                Request.get(Config.api.getUserToken,(data)=>{
                    console.log(data);
                    if (data && data.success){
                        let token = data.token;
                        AsyncStorage.setItem(KEY,token,(error)=>{
                            if (error){
                                console.log('存储失败' + error);
                            }else {
                                console.log('存储成功');
                                USERTOKEN = token;
                            }
                        })
                    }
                },(error)=>{
                    console.log(error);
                    // TOKEN = '0ddc64eb-48e3-4d4c-a83c-a61caa2450d4';
                })
            }else {
                console.log('获取成功' + result);
                // TOKEN = '0ddc64eb-48e3-4d4c-a83c-a61caa2450d4';
                USERTOKEN = result;
            }
        });

        this.subscription = DeviceEventEmitter.addListener('SHITUIMAGE', (params)=>{
            // this.imageUri = params;
            this.setState({
                imageUri:params,
            });
            // console.log(params);
        });
         */

    };

    constructor(props){
        super(props);

        this.state = {
            // viewRef: null,
            // imageUri:'timg',
        }
    };

    _upload = (body) => {
        // 开启XMLHttpRequest服务
        let xhr = new XMLHttpRequest();

        console.log(body);

        /** 上传到七牛云的地址 */
        let url = Config.qiniu.upload;

        // 开启post上传
        xhr.open('POST',url);

        const { navigate } = this.props.navigation;

        // 如果正在上传,将上传返回的onprogress
        if (xhr.upload){
            xhr.upload.onprogress = (event)=>{
                if (event.lengthComputable){
                    let perent = event.loaded / event.total.toFixed(2);
                    // 搜索进度打印
                    // console.log(perent);
                    this.perent = perent;
                    this.isUpload = true;
                }
            }
        }

        // 上传过成功的返回
        xhr.onload = ()=>{
            // console.log(xhr.status);
            // 状态码如果不等于200就代表错误
            if (xhr.status !== 200){
                alert('请求失败');
                console.log(xhr.responseText);
                return;
            }
            if (!xhr.responseText){
                alert('请求失败');
                console.log(xhr.responseText);
                return;
            }
            // 服务器最后返回的数据
            let response;
            try{
                // 将返回数据还原
                response = JSON.parse(xhr.response);
                // console.log(response);

                let body = {
                    token:response.key,
                };

                Request.post(Config.api.postWebUrl,body,(data)=>{
                    console.log('getWebUrl');
                    console.log(data);

                    let imageURL = data.data.imageURL;
                    let timestamp = Date.parse(new Date());

                    realm.write(() => {
                        realm.create('History', {
                             id:      response.key.replace('.jpeg',''),
                             imageURL:   imageURL,
                             timestamp:  timestamp
                        });
                    });
                    data.data.title = '搜索详情';

                    if (this.perent === 1){
                        InteractionManager.runAfterInteractions(()=> {
                            // navigate('Detail', {
                            //     data: data.data.webURL,
                            //     title:'搜索详情',
                            //     isVisible:true
                            // });


                            this.isUpload = false;
                            this.hintText = '是否是您寻找的答案呢?'
                        });
                    }
                },(error) =>{
                    console.log(error);
                });
            }
            catch (e){
                console.log(e);
            }
        };

        xhr.send(body);
    };

    _onPress = () => {
        isUpload = true;
        const { navigate } = this.props.navigation;
        const { userToken } = this.props.ShiTuReducer;

        console.log(this.props);

        ImagePicker.showImagePicker(photoOptions, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('点击了取消按钮');
                return;
            }
            if(!response.error){
                // imageUri = response.uri;

                this.props.getBackImage(response.uri);
                if (userToken.length > 0){
                    this.props.qiNiuToken(response);
                }
                else{
                    console.log('没有获取到USERTOKEN');
                }
            }
        });
    };

    _imageOnLoaded = ()=> {
        Android && InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                // this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
                this.viewRef = findNodeHandle(this.backgroundImage);
            }, 0);

        });
    };

    _defaultView() {
        return(
            iOS ?
                <BlurView blurType="light"
                          blurAmount={5}
                          style={styles.iOSBlur}
                >
                    <Text style={styles.textStyle}>
                        {hintText}
                    </Text>
                    <Button
                        backgroundColor={COLORS.appColor}
                        raised
                        borderRadius={5}
                        title='点我寻找!'
                        animationType="bounceInLeft"
                        onPress = {this._onPress}
                    />
                </BlurView>
                :
                <View style={styles.blurViewStyle}>
                    {this.viewRef &&
                    <BlurView blurType="light"
                              blurAmount={5}
                              style={styles.AndroidBlur}
                              viewRef={this.viewRef}
                    />}
                        <Text style={styles.textStyle}>
                            {hintText}
                        </Text>
                        <Button
                            backgroundColor={COLORS.appColor}
                            raised
                            borderRadius={5}
                            title='点我寻找!'
                            animationType="bounceInLeft"
                            onPress = {this._onPress}
                        />
                </View>
        )
    }

    _findView () {
        return(
            iOS
                ?
                <BlurView blurType="light"
                      blurAmount={5}
                      style={styles.iOSBlur}
                >
                    <Progress.Circle
                        showsText={true}
                        color = {COLORS.appColor}
                        progress={this.perent}
                        size={130}
                        formatText={()=>{
                                            return(
                                                <Text style={{fontSize:FONT_SIZE(17)}}>
                                                    正在查找
                                                </Text>
                                            )
                                        }}
                    />
                </BlurView>
                :
                <View style={styles.blurViewStyle}>
                    {this.viewRef &&
                    <BlurView blurType="light"
                              blurAmount={5}
                              style={styles.AndroidBlur}
                              viewRef={this.viewRef}
                    />}
                    <Progress.Circle
                        showsText={true}
                        color = {COLORS.appColor}
                        progress={this.perent}
                        size={130}
                        style={styles.progressStyle}
                        formatText={()=>{
                                            return(
                                                <Text style={{fontSize:FONT_SIZE(17)}}>
                                                    正在查找
                                                </Text>
                                            )
                                        }}
                    />

                </View>
        )
    }

    render() {
        console.log('render');
        return (
            <View style={styles.container}>
                <Image
                       source={{uri:imageUri}}
                       style={[styles.image]}
                       animation="fadeIn"
                       ref={image => this.backgroundImage = image}
                       onLoadEnd={() => this._imageOnLoaded()}
                />

                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    {
                        !isUpload
                            ?
                            this._defaultView()
                            :
                            this._findView()
                    }

            </View>
        );
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    image:{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: -1,
        right: 0,
        // resizeMode: 'cover',
        width: null,
        height: null,
    },
    iOSBlur:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT - 64 - 49,
        alignItems:'center',
        justifyContent: 'center',
    },
    AndroidBlur:{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
    blurViewStyle:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        alignItems:'center',
        justifyContent:'center',
        // alignSelf:'center',
        // alignContent:'center',
    },
    textStyle:{
        fontSize:iOS?FONT_SIZE(18):FONT_SIZE(22),
        color:'black',
        marginBottom:20
    },
    progressStyle:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        alignContent:'center',
    }
});

// const mapStateToProps = (state) => {
//     const { ShiTuReducer } = state;
//     return {
//         ShiTuReducer
//     };
// };
//
// const mapDispatchToUserToken = (dispatch) => {
//     const userActions = bindActionCreators(User, dispatch);
//     return {
//         userActions
//     };
// };
//
// const mapDispatchToQiNiuToken = (dispatch) => {
//     const qiNiuActions = bindActionCreators(QiNiu, dispatch);
//     return {
//         qiNiuActions
//     };
// };
//
// export default connect(mapStateToProps,mapDispatchToUserToken,mapDispatchToQiNiuToken)(ShiTu)

export default connect((state) => {
    const { ShiTuReducer } = state;
    return {
        ShiTuReducer
    };
},{ userToken, qiNiuToken, backImage,getQiNiuToken,getBackImage})(ShiTu)

//这里是绑定 一共2个参数 第一个是 state 第二个是 方法 方法有很多方式 我这样的是比较方便的 不需要引用dispatch来调方法
//在别的页面想使用同样的 state 或者 调用相同的方法 改值 一样的connect
//这个state 是整个 状态树 里面还有很多 取决于你的 reducers
// export default connect((state) => {
//     const { ShiTuReducer } = state;
//     return {
//         ShiTuReducer
//     };
// },  dispatch => bindActionCreators({userToken, qiNiuToken, backImage,getQiNiuToken}, dispatch),)(ShiTu)