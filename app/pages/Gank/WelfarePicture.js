/**
 * Created by Rabbit on 2017/4/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { backImage,getBackImage } from '../../actions/ShiTuBackImage';
import { qiNiuToken, getQiNiuToken } from '../../actions/ShiTuQiNiu';


import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = [ '取消','收藏图片','设为主屏幕' ];
const actionTitle = '选择';

// const { state } = this.props.navigation;

@observer
class WelfarePicture extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        // title: navigation.state.params.title + "'s Profile!",
        // headerRight:(
        //     <Text onPress={navigation.state.params.goBackPress}>
        //         返回
        //     </Text>
        // )
    });

    goBackPress = () => {
        alert('haha');
        console.log(this.props.navigation);
    };

    @observable
    isShow = true;

    fetch = async (url) => {
        try {
            let data = await fetch(url);
            data = await data.json();
            console.log(data);
        }catch (e){
            console.log(e);
        }
    }

    componentWillMount(){

        // this.props.navigation.setParams({
        //     title:'hahaha',
        //     goBackPress:this.goBackPress
        // });

        console.log(this.props);
    }

    constructor(props){
        super(props);
        this.state = {
            // isShowNav:false,
        }
    }

    _onPress = ()=> {
        // console.log(this.props.navigation);
        // console.log(this.props.navigation.state);
        // this.setState({
        //     isShow: !this.state.isShow
        // });

        this.isShow = !this.isShow;
        console.log(this.isShow);
        this.props.navigation.setParams({isVisible:this.isShow});
    };

    _onLongPress = ()=>{
        this.ActionSheet.show()
    };

    handlePress(url,i) {

        let SHITUIMAGEKEY = 'SHITUIMAGEKEY';
        if(i===2){
            AsyncStorage.setItem(SHITUIMAGEKEY,url,(error)=>{
                if (error){
                    console.log('存储失败' + error);
                }else {
                    console.log('存储成功');
                    // 之前的做法是这里发送通知到首页
                    // DeviceEventEmitter.emit('SHITUIMAGE',url);
                    this.props.getQiNiuToken();
                    this.props.getBackImage(url);
                }
            })
        }
    }

    render() {
        const { state: { params: { url } } } = this.props.navigation;
        console.log(this.isShow);
        let style ;
        this.isShow ?
            style={width:SCREEN_WIDTH, height:SCREEN_HEIGHT}
            : style={width:SCREEN_WIDTH, height:SCREEN_HEIGHT-64}

        return (
            <View>
                <TouchableOpacity onPress={this._onPress}
                                  activeOpacity={1}
                                  onLongPress={this._onLongPress}
                >
                    <Image
                        source={{uri:url}}
                        style={style}
                    />

                </TouchableOpacity>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={actionTitle}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={(i)=>this.handlePress(url,i)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default connect((state) => {
    const { ShiTuReducer } = state;
    return {
        ShiTuReducer
    };
},{  backImage,getBackImage,getQiNiuToken})(WelfarePicture)

// export default connect((state) => {
//     // ShiTuReducer 可以有很多吗？
//     // 这个页面应该数据Welf了。。 下面可以写多个吗？可以啊你  按需加backImage 这个只是方法
//     const { ShiTuReducer } = state;
//     return {
//         ShiTuReducer
//     };
// },  dispatch => bindActionCreators({ backImage,getBackImage}, dispatch),)(WelfareItem)

