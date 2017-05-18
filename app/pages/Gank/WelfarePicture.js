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
    AsyncStorage
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
        this.props.navigation.setParams({title:'hahahahaha'});
        // this.props.navigation.setParams({ headerLeft:({ navigation ,goBack})=>(
        //     <TouchableOpacity onPress={()=>{goBack('Main')}}>
        //         <Text>hahaha</Text>
        //     </TouchableOpacity>
        // )
        // });
        console.log(this.props.navigation.state);
    }

    constructor(props){
        super(props);
        this.state = {
            // isShowNav:false,
        }
    }

    _onPress = ()=> {
        // !this.state.isShowNav
        this.setState({
            isShow: !this.state.isShow
        });
        // this.isShow = true;
    };

    _onLongPress = ()=>{
        console.log('长按手势');
        console.log(this.props.navigation.state);

        this.ActionSheet.show()
    }

    handlePress(url,i) {
        console.log(url);
        console.log(i);
        // const { state: { params: { url } } } = this.props.navigation;
        let SHITUIMAGEKEY = 'SHITUIMAGEKEY';
        if(i===2){
            AsyncStorage.setItem(SHITUIMAGEKEY,url,(error)=>{
                if (error){
                    console.log('存储失败' + error);
                }else {
                    console.log('存储成功');
                }
            })
        }
    }

    render() {
        const { state: { params: { url ,title } } } = this.props.navigation;
        // const { isShowNav} = this.state;
        console.log(this.props.navigation);

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
                    {this.state.isShow ?
                        <View style={{height:64,backgroundColor:'#4ECBFC',flexDirection:'row'}}>
                            <Button
                                isCustom={true}
                                customView={
                                <Icon
                                    name='ios-arrow-back'
                                    size={30}
                                    color='white'
                                    style={{marginLeft:iOS?0:12,marginTop:27}}
                                />
                            }
                                style={{marginLeft:12}}
                                onPress={()=>{this.props.navigation.goBack()}}
                            />
                            <Text style={styles.navTitleStyle}>{title}</Text>
                        </View>
                        :null
                    }
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
    },
    navTitleStyle:{
        // alignItems:'center',
        color:'white',
        fontSize:FONT_SIZE(20),

        height:64,
        width:SCREEN_WIDTH - 47,
        // alignSelf:'center',
        // alignItems:'center',
        // justifyContent:'center',
        textAlign:'center',
        marginTop:30,
        fontWeight:'500'
    }
});

