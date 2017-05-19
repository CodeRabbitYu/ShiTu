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

import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = [ '取消','收藏图片','设为主屏幕' ];
const actionTitle = '选择';

// const { state } = this.props.navigation;

@observer
export default class WelfareItem extends Component {
    static navigationOptions = {
        // cardStack- 配置card stack
        cardStack:{
            // 是否允许通过手势关闭该界面，在iOS上默认为true，在Android上默认为false
            gesturesEnabled:false
        },

    };

    @observable
    isShow = false;

    componentDidMount(){
        // this.props.navigation.setParams({title:'hahahahaha'});
        // this.props.navigation.setParams({ headerLeft:({ navigation ,goBack})=>(
        //     <TouchableOpacity onPress={()=>{goBack('Main')}}>
        //         <Text>hahaha</Text>
        //     </TouchableOpacity>
        // )
        // });


        console.log(this.props);
        console.log(this.props.navigation.state);
    }

    constructor(props){
        super(props);
        this.state = {
            // isShowNav:false,
        }
    }

    _onPress = ()=> {
        this.setState({
            isShow: !this.state.isShow
        });
        this.props.navigation.setParams({isVisible:this.state.isShow});
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
                    DeviceEventEmitter.emit('SHITUIMAGE',url);
                }
            })
        }
    }

    render() {
        const { state: { params: { url } } } = this.props.navigation;

        let style ;
        this.state.isShow ?
            style={width:SCREEN_WIDTH,height:SCREEN_HEIGHT-64}
            : {width:SCREEN_WIDTH,height:SCREEN_HEIGHT}

        return (
            <View>
                <TouchableOpacity onPress={this._onPress}
                                  activeOpacity={1}
                                  onLongPress={this._onLongPress}
                >
                    <Image
                        source={{uri:url}}
                        style={[{
                            height:SCREEN_HEIGHT,
                            width:SCREEN_WIDTH},style]}
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

