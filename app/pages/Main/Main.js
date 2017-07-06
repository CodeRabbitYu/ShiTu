/**
 * Created by Rabbit on 2017/4/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    AsyncStorage,
    Modal,
    TouchableOpacity,
    Alert,
    StatusBar,
    InteractionManager,
    Share
} from 'react-native';
import Button from '../../component/Button';
import Login from '../Login/Login';

import {  View } from 'react-native-animatable';
import AlertModal from '../../common/AlertModal';

export default class Main extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle:navigation.state.params?navigation.state.params.title:null,
        // headerLeft:(
        //     <Text style={{color:'red'}} onPress={()=>navigation.state.params.navigatePress()}>我的</Text>
        // ),
        tabBarLabel:({focused})=>(
            <Text style={{color: focused?'red':'green'}}>我的</Text>
        ),
        // tabBarVisible:false
    });

    navigatePress = () => {
        alert('点击headerRight');
    }

    test(){
        let test = AsyncStorage.getItem('USERTOKEN');
        // console.log(test);
        return test;
    }

    async componentDidMount(){
        console.log(this.props.navigation);

        this.props.navigation.setParams({
            title:'haha',
            navigatePress:this.navigatePress
        });

        // this.props.navigation.setParams({
        //     title:'hahaha',
        //     goBackPress:this.goBackPress,
        // });

        // console.log(this.props);

        let data = await AsyncStorage.getItem('TOKEN');
        // console.log(data);
        if (data === null){
            // console.log('false');
            return(
                // Alert.alert('尚未登录')
                null
            )
        }else {
            console.log('true');
            return true;
        }


    }

    // 组件要不要更新
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate','组件要不要更新');
        return true;
    }
    // 组件将要更新
    componentWillUpdate(){
        console.log('componentWillUpdate','组件将要更新');
    }

    // 即将拿到组件的更新
    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps',props);

    }

    // 组件已经更新
    componentDidUpdate() {
        console.log('componentDidUpdate','组件更新完成');
    }


    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            data: '',
            viewVisible : false,
        };
    }



    componentWillUnmount(){
        this.setState({modalVisible: false});
    }
    render() {
        // console.log('Main');

        console.log (this.props.navigation.state);
        if (this.state.data){
            console.log('获得数据');
        }

        const { navigate } = this.props.navigation;
        return (
            <View style={{marginTop: 22,height:SCREEN_HEIGHT - 64}}>
                <StatusBar
                    // backgroundColor="blue"
                    // barStyle="dark-content"
                    showHideTransition="slide"
                />

                {/*<LoginModal isVisible={this.state.modalVisible}/>*/}

                <AlertModal
                    ref={AlertModal => this.AlertModal = AlertModal}
                    message='这是一个自定义弹窗'
                    rightButtonText='确定'
                    leftButtonText='取消'
                    onRightClick={()=>{
                        {/*this.AlertModal.hide();*/}
                        this.AlertModal.setTitle('haha');
                    }}
                    onLeftClick={()=>{
                        this.AlertModal.hide();
                    }}
                />

                <TouchableOpacity onPress={() => {
                    navigate('Login',{
                        callback: (data)=>{
                            this.setState({
                                data:data
                            })
                        },
                        title:'登录'
                    });
                }}>
                    <Text style={{fontSize:20}}>登录按钮</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigate('SearchHistory',{
                        title:'搜索历史'
                    });
                }} style={{marginTop:30}}>
                    <Text style={{fontSize:20}}>搜索历史</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.AlertModal.show();
                }} style={{marginTop:30}}>
                    <Text style={{fontSize:20}}>弹出Modal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.setState({
                        viewVisible:true
                    })
                }} style={{marginTop:30}}>
                    <Text style={{fontSize:20}}>弹出View</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    Share.share({
                      message: 'A framework for building native apps using React',
                      url: 'http://facebook.github.io/react-native/',
                      title: 'React Native'
                    },{
                      dialogTitle: 'Share React Native website',
                      excludedActivityTypes: [
                        'com.apple.UIKit.activity.PostToTwitter'
                      ],
                      tintColor: 'green'
                    })
                    .then(this._showResult)
                    .catch((error) => {
                        console.log(error);
                        alert(error)
                    });
                }} style={{marginTop:30}}>
                    <Text style={{fontSize:20}}>分享</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Register');
                }} style={{marginTop:30}}>
                    <Text style={{fontSize:20}}>注册</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Collection');
                }} style={{marginTop:30}}>
                    <Text style={{fontSize:20}}>收藏</Text>
                </TouchableOpacity>

                {this.state.viewVisible ?
                    <View style={{height:300,width:'100%',backgroundColor:'red'}}
                          animation="bounceInUp"
                          useNativeDriver
                          ref={ (e) => this._view = e }
                    >
                        <Text style={{fontSize:20}} onPress={()=>{
                            this._view.setNativeProps({
                                animation:"bounceInDown",
                                style:{
                                  backgroundColor:'green',
                                }
                              });

                        InteractionManager.runAfterInteractions(()=> {
                                this.setState({
                                    viewVisible:false,
                                })
                            });
                        }
                        }>关闭View</Text>
                    </View>
                    : null
                }

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    ref={activeModal => this.activeModal = activeModal}
                >
                    <View style={{marginTop: 22,backgroundColor:'red'}}>
                        <View>
                            <Text>Hello World!</Text>
                            <TouchableOpacity onPress={() => {

                                this.activeModal.hideModal();

                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

            </View>
        );
    }

    _showResult= (result) =>{
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                this.setState({result: 'shared'});
            }
            alert(result.activityType);
        } else if (result.action === Share.dismissedAction) {
            this.setState({result: 'dismissed'});
            alert('dismissed')
        }
    }

    showModal(){
        this.setState({
            modalVisible:true
        })
    }
    hideModal(){
        this.setState({
            modalVisible:false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
/**
<Modal
    animationType={"slide"}
    transparent={true}
    visible={this.state.modalVisible}
    onRequestClose={() => {alert("Modal has been closed.")}}
>
    <Login closeClick={this._closeModal} navigate={navigate}/>
</Modal>
*/
/**
<View style={styles.container}>
    <Text style={styles.welcome} onPress={() => navigate('Gank')}>
        Welcome to React Native!
    </Text>
    <Button
        title='搜索历史'
        onPress={()=>{
                        console.log('搜索历史');
                        navigate('SearchHistory',{
                            title:'搜索历史',
                        });
                    }}/>
</View>
 */