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
    DeviceEventEmitter,
    InteractionManager,
    BackHandler,
    CameraRoll
} from 'react-native';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { backImage,getBackImage } from '../../actions/ShiTu/BackImage';
import { qiNiuToken, getQiNiuToken } from '../../actions/ShiTu/SearchPicture';


import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

import ActionSheet from 'react-native-actionsheet'


const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = [ '取消','保存图片','设为主屏幕' ];
const actionTitle = '选择';

// const { state } = this.props.navigation;

@observer
class WelfarePicture extends Component {
    // static navigationOptions = ({ navigation, screenProps }) => ({
        // headerTitle: navigation.state.params.title + "'s Profile!",
        // headerRight:(
        //     <Text onPress={navigation.state.params.goBackPress}>
        //         返回
        //     </Text>
        // )
    // });

    goBackPress = () => {
        alert('haha');
        console.log(this.props.navigation);
    };

    @observable
    isShow = true;

    componentWillMount(){
        console.log(this.props);
    }

    onBackAndroid = ()=> {
        const {routes} = this.props;
        if (routes.length > 1) {
            this.props.navigation.goBack();
            return true;
        }
    }
    componentDidMount(){
        const {routes} = this.props;
        console.log(routes);
        if (Android){
            BackHandler.addEventListener('handwareBackDetail',this.onBackAndroid)
        }
    }
    componentWillUnmount(){
        if (Android){
            BackHandler.addEventListener('handwareBackDetail',this.onBackAndroid)
        }
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

        // console.log(this.props.routes);
        // const { routes } = this.props;
        // this.props.navigation.goBack(routes[1].key)

        this.isShow = !this.isShow;
        // console.log(this.isShow);
        this.props.navigation.setParams({isVisible:this.isShow});
    };

    _onLongPress = ()=>{
        this.ActionSheet.show()
    };

    handlePress(url,i) {

        let SHITUIMAGEKEY = 'SHITUIMAGEKEY';

        let AndroidURL = 'file:///storage/emulated/0/Pictures/image.jpg'
        switch (i){
            case 1 :
                CameraRoll.saveToCameraRoll(iOS ? url : AndroidURL,'photo')
                    .then((data)=>{
                        console.log(data)
                        // alert(data);
                    })
                    .catch((error)=>{
                        console.log(error);
                        // alert(error);
                    });
            break;
            case 2:
                InteractionManager.runAfterInteractions(()=>{
                    AsyncStorage.setItem(SHITUIMAGEKEY,url,(error)=>{
                        if (error){
                            console.log('存储失败' + error);
                        }else {
                            console.log('存储成功');
                            // 之前的做法是这里发送通知到首页
                            // DeviceEventEmitter.emit('SHITUIMAGE',url);
                            // this.props.getQiNiuToken();

                            this.props.getBackImage(url);
                        }
                    })
                });
            break;
        }
        // if(i===2){
        //
        // }
    }

    render() {
        const { state: { params: { url } } } = this.props.navigation;
        // console.log(this.isShow);
        let style ;
        this.isShow ?
            style={width:SCREEN_WIDTH, height:SCREEN_HEIGHT}
            : style={width:SCREEN_WIDTH, height:Android?SCREEN_HEIGHT-56:SCREEN_HEIGHT - 64}

        return (
            <View>
                <TouchableOpacity onPress={this._onPress}
                                  activeOpacity={1}
                                  onLongPress={this._onLongPress}
                >
                    <Image
                        source={{uri:url}}
                        style={[{},style]}
                        resizeMode="cover"
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
    const routes  = state.nav.routes;
    return {
        ShiTuReducer,
        routes
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

