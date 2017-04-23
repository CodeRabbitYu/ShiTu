/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
    InteractionManager
} from 'react-native';

import '../common/Global'

import {  View, Text, Image } from 'react-native-animatable';
import Button from '../component/Button';
const { BlurView ,VibrancyView} = require('react-native-blur');
import ImagePicker from 'react-native-image-picker';
import Request from '../common/Request';
import Config from '../common/Config';
import Detail from './Detail';

import RNFetchBlob from 'react-native-fetch-blob';

import * as Progress from 'react-native-progress';


import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

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

let TOKEN;

@observer
export default class ShiTu extends Component {
    // 北京图片地址
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

    static navigationOptions = {
        title: '识兔',
        tabBar:{
            label: ' ',
            icon: ({ tintColor }) => (
                <Image
                    source={{uri : '识兔'}}
                    style={[tabBarIcon, {tintColor: tintColor}]}
                />
            ),
        },
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

    componentDidMount(){
        let KEY = 'TOKEN';
        AsyncStorage.getItem(KEY,(Error,result)=>{
            if (result === null){
                Request.get(Config.api.getToken,(data)=>{
                    console.log(data);
                    if (data && data.success){
                        let token = data.token;
                        AsyncStorage.setItem(KEY,token,(error)=>{
                            if (error){
                                console.log('存储失败' + error);
                            }else {
                                console.log('存储成功');
                                TOKEN = token;
                            }
                        })
                    }
                },(error)=>{
                    console.log(error);
                    TOKEN = '0ddc64eb-48e3-4d4c-a83c-a61caa2450d4';
                })
            }else {
                console.log('获取成功' + result);
                // TOKEN = '0ddc64eb-48e3-4d4c-a83c-a61caa2450d4';
                TOKEN = result;
            }
        });

    };

    constructor(props){
        super(props);
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
                    console.log(perent);
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
                let params = {
                    token : response.key
                };
                Request.post(Config.api.getWebUrl,params,(data)=>{
                    console.log('getWebUrl');
                    // console.log(data);
                    if (this.perent === 1){
                        InteractionManager.runAfterInteractions(()=> {
                            navigate('Detail', {
                                data: data,
                            });
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
        ImagePicker.showImagePicker(photoOptions, (response) => {

            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('点击了取消按钮');
                return;
            }

            if(!response.error){
                this.imageUri = response.uri;
            }

            // let avatarData = 'data:image/png;base64,'+response.data
            // let avatarData = 'data:image/jpeg;base64,' + response.data;
            if (TOKEN.length > 0){
                let body = {
                    token:TOKEN,
                };

                Request.post(Config.api.getUpLoadToken,body,(data)=> {
                    console.log('getUpLoadToken');
                    // console.log(data);
                    let token = data.data.token;
                    let key = data.data.key;

                    // console.log(data);
                    let body = new FormData();
                    body.append('token',token);
                    body.append('key',key);
                    body.append('file',{
                        type : 'image/jpeg',
                        uri : this.imageUri,
                        name : key,
                    });
                    this._upload(body);

                },(error)=>{
                    console.log(error);
                })
            }
            else{
                console.log('没有获取到TOKEN');
            }
        });
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Image source={{uri:this.imageUri}}
                   style={[styles.menu,{display:'flex'}]}
                   animation="fadeIn"
                   useNativeDriver
            >
                {
                    !this.isUpload ?  <BlurView blurType="light" blurAmount={5} style={styles.blur}>
                            <Text style={styles.textStyle}>
                                {this.hintText}
                            </Text>
                            <Button
                                backgroundColor={COLORS.appColor}
                                raised
                                borderRadius={5}
                                title='点我寻找!'
                                animationType="bounceInLeft"
                                onPress={this._onPress}
                            />
                        </BlurView>
                        :
                        <BlurView blurType="light" blurAmount={5} style={styles.blur}>
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
                }
            </Image>
        );
    };

}

global.USERTOKEN = TOKEN;

const styles = StyleSheet.create({
    menu:{
        flex: 1,
        backgroundColor: 'white',
    },
    blur:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT - 64 - 49,
        alignItems:'center',
        justifyContent: 'center',
    },
    textStyle:{
        fontSize:FONT_SIZE(18),
        marginBottom:20
    },
    progressStyle:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        alignContent:'center',
    }
});

