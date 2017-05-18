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
    NetInfo
} from 'react-native';

import '../../common/Global'
import NetWorkTool from '../../common/NetInfo';
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
let USERTOKEN;


@observer
export default class ShiTu extends Component {

    // 背景图片地址
    @observable
    imageUri='timg';
    // 进度条
    @observable
    perent='';
    // 是否正在查找中
    @observable
    isUpload=false;
    @observable
    hintText= '点击按钮,搜索你想知道的图片哦!';

    handleMethod = (isConnected)=> {
        console.log('ShiTu', (isConnected ? 'online' : 'offline'));
        console.log(isConnected);
        NetInfo.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
    };


    componentWillMount(){
        // NetInfo.isConnected.fetch().then().done(() => {
        //     NetInfo.isConnected.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
        // });

        // NetWorkTool.addEventListener('change',this.handleMethod);
        iOS
            ?
            NetWorkTool.listenerNetworkState(()=>{
                NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
            })
            :
            NetWorkTool.listenerNetworkState((isConnected)=>{
                console.log(isConnected);
            });

    }

    componentWillUnmount(){
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    componentDidMount(){

        // NetWorkTool.checkNetworkState((isConnected)=>{
        //     console.log(isConnected);
        // });

        // console.log(list);
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

    };

    constructor(props){
        super(props);

        this.state = {
            viewRef: null,
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
        const { navigate } = this.props.navigation;

        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('点击了取消按钮');
                return;
            }
            if(!response.error){
                this.imageUri = response.uri;
            }
            if (USERTOKEN.length > 0){
                Request.get(Config.api.getUpLoadToken,(data)=> {
                    console.log('getUpLoadToken');
                    // console.log(data);
                    let token = data.data.token;
                    let key = data.data.key;

                    // console.log(data);

                    // 创建form表单来上传图片,但现在使用react-native-fetch-blob就没用到这个
                    /**
                    let formData = new FormData();
                    formData.append('token',token);
                    formData.append('key',key);
                    formData.append('file',{
                        type : 'image/jpeg',
                        uri : this.imageUri,
                        name : key,
                    });
                    console.log(formData);
                     */

                    // 上传七牛云,这里需要将'///'处理掉,因为使用wrap的时候,会再添加一层
                    let PATH = iOS?response.uri.replace('file:///',''):response.uri;
                    // let PATH = response.uri;
                    let body = [{
                        name:'token',data:token,
                    }, {
                        name:'key', data:key,
                    },{
                        name: 'file',
                        filename: key || 'file',
                        // type : 'image/jpeg',
                        data: RNFetchBlob.wrap(PATH)
                    }];

                    Request.upload(Config.qiniu.upload,body,(perent)=>{
                        this.perent = perent;
                        this.isUpload = true;
                    },(response)=>{
                        let body = {
                            token: response.key,
                        };
                        Request.post(Config.api.postWebUrl, body, (data) => {
                            console.log('getWebUrl');

                            if (!data){
                                return;
                            }
                            if (data && data.success){
                                try {
                                    let imageURL = data.data.imageURL;
                                    let timestamp = Date.parse(new Date());

                                    realm.write(() => {
                                        realm.create('History', {
                                            id: response.key.replace('.jpeg', ''),
                                            imageURL: imageURL,
                                            timestamp: timestamp
                                        });
                                    });

                                    if (this.perent === 1) {
                                        navigate('WebViewDetail', {
                                            data: data.data.webURL,
                                            isVisible:true
                                        });
                                        InteractionManager.runAfterInteractions(() => {
                                            this.isUpload = false;
                                            this.hintText = '是否是您寻找的答案呢?'
                                        });
                                    }
                                }
                                catch (e) {
                                    // err = "上传失败";
                                }
                                finally {
                                    // if (err) {
                                    //     Toast.info(err, 1);
                                    //     return;
                                    // }
                                    // resultCallback(data);
                                    // task.cancel();
                                }
                            }
                            else {
                                console.log('上传错误');
                            }
                        })
                    },(error)=>{
                        console.log(error);
                    });
                    // this._upload(body);
                },(error)=>{
                    console.log(error);
                })
            }
            else{
                console.log('没有获取到USERTOKEN');
            }
        });
    };

    _imageOnLoaded= ()=> {
        Android && InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.setState({ viewRef: findNodeHandle(this.refs.backgroundImage) });
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
                        {this.hintText}
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
                    {this.state.viewRef && <BlurView blurType="light"
                              blurAmount={5}
                              style={styles.AndroidBlur}
                              viewRef={this.state.viewRef}
                    />}
                        <Text style={styles.textStyle}>
                            {this.hintText}
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
                      viewRef={this.state.viewRef}
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
                    {this.state.viewRef && <BlurView blurType="light"
                                              blurAmount={5}
                                              style={styles.AndroidBlur}
                                              viewRef={this.state.viewRef}
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
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Image
                    //source={require('../resources/timg.jpeg')}
                    source={{uri:this.imageUri}}
                       style={[styles.image]}
                       animation="fadeIn"
                       useNativeDriver
                       ref={'backgroundImage'}
                       onLoad={this._imageOnLoaded()}
                />
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    {
                        !this.isUpload
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
        bottom: 0,
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

