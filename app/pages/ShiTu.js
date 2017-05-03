/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
    InteractionManager,
    StatusBar
} from 'react-native';

import '../common/Global'

import {  View, Text, Image } from 'react-native-animatable';
import Button from '../component/Button';
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

import Request from '../common/Request';
import Config from '../common/Config';

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

    componentDidMount(){
        let list =[];

        // console.log(realm.objects('History')[0].imageUri);

        // for (let i =0 ; i<realm.objects('History').length;i++){
        //     // console.log(realm.objects('History')[i].imageUri);
        //     // list.push(realm.objects('History')[i].id);
        // }


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
                    // console.log(data);

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
                        // InteractionManager.runAfterInteractions(()=> {
                            navigate('Detail', {
                                data: data.data.webURL,
                                isVisible:true
                            });


                            this.isUpload = false;
                            this.hintText = '是否是您寻找的答案呢?'
                        // });
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
                    let formData = new FormData();
                    formData.append('token',token);
                    formData.append('key',key);
                    formData.append('file',{
                        type : 'image/jpeg',
                        uri : this.imageUri,
                        name : key,
                    });

                    // console.log(formData);
                    let PATH = response.uri.replace('file:///','');
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
                        console.log(response);
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
                                        InteractionManager.runAfterInteractions(() => {
                                            navigate('Detail', {
                                                data: data.data.webURL,
                                            });
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

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Image source={{uri:this.imageUri}}
                   style={[styles.menu,{display:'flex'}]}
                   animation="fadeIn"
                   useNativeDriver
            >
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
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

