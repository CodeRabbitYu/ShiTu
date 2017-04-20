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

    constructor(props){
        super(props);
        this.state = {
            // 用户数据
            imageUri:'timg',
        };
    }

    _onPress = () => {
        console.log('点我查找');
        ImagePicker.showImagePicker(photoOptions, (response) => {

            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('点击了取消按钮');
                return;
            }
            // let avatarData = 'data:image/png;base64,'+response.data
            let avatarData = 'data:image/jpeg;base64,' + response.data;

            this.setState({
                imageUri:response.uri
            })

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
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    menu:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT - 64 - 49,
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

