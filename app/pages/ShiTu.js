/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    // Image
} from 'react-native';

import '../common/Global'

import {  View, Text, Image } from 'react-native-animatable';
import Button from '../component/Button';
const { BlurView ,VibrancyView} = require('react-native-blur');
import ImagePicker from 'react-native-image-picker';
import Request from '../common/Request';
import Config from '../common/Config';

import Detail from './Detail';

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

export default class ShiTu extends Component {
    static navigationOptions = {
        title: '识兔',
        tabBar:{
            label: ' ',
            icon: ({ tintColor }) => (
                <Image
                    source={{uri : 'rabbit'}}
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
    }

    constructor(props){
        super(props);
        this.state = {
            // 用户数据
            imageUri:'timg',
        };
    }

    upload = (body) => {
        // 开启XMLHttpRequest服务
        let xhr = new XMLHttpRequest();

        /** 上传到七牛云的地址 */
        let url = Config.qiniu.upload;

        // 开启post上传
        xhr.open('POST',url);


        const { navigate } = this.props.navigation;

        // 上传过成功的返回
        xhr.onload = ()=>{
            console.log(xhr.status);
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
                console.log(response);

                let params = {
                    token : response.key
                };
                Request.post(Config.api.getWebUrl,params,(data)=>{
                    console.log(data);
                    navigate('Detail', {
                        data: data
                    });

                },(error) =>{
                    console.log(error);
                },{});

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
                this.setState({
                    imageUri:response.uri
                })
            }

            // let avatarData = 'data:image/png;base64,'+response.data
            let avatarData = 'data:image/jpeg;base64,' + response.data;
            let body = {
                'haha':'aa',
            };

            Request.post(Config.api.uploadImage,body,(data)=>{
                console.log(data);

                let token = data.data.token;
                let key = data.data.key;
                // console.log(data);
                let body = new FormData();
                body.append('token',token);
                body.append('key',key);
                body.append('file',{
                    type : 'image/jpeg',
                    uri : this.state.imageUri,
                    name : key,
                });
                this.upload(body);

            },(error)=>{
                console.log(error);
            },{})



        });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Image source={{uri:this.state.imageUri}}
                   style={[styles.menu,{display:'flex'}]}
                   animation="fadeIn"
                   useNativeDriver
            >
                <BlurView blurType="light" blurAmount={5} style={styles.blur}>
                    <Text style={styles.textStyle}>
                        点击按钮,搜索你想知道的图片哦!
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
            </Image>
        );
    }
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
    }
});

