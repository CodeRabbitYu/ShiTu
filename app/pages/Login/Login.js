/**
 * Created by Rabbit on 2017/5/10.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    TouchableOpacity
} from 'react-native';

import { NavigationActions } from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
import RTTextInput from '../../component/RTTextInput';

// import Request from '../../common/Request';
import Config from '../../common/Config';

// import { Post } from '../../common/Fetch';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

// const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({ routeName: 'MyTab' })
//     ]
// });

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main'})
    ]
});
const setParamsAction = NavigationActions.setParams({
    params: { title: 'Hello' },
    key: 'screen-123',
});


@observer
export default class Login extends Component {

    // @observable
    // success=true;
    // @observable
    // error=false;

    static navigationOptions = {
        tabBarVisible:false,
        // header:null,
    }

    constructor(props){
        super(props);
        let { state } = this.props.navigation;
        this.state = {
            title: state.title,
            userNameStatus:true,
            passWordStatus:true,
            loginMode:true,
            numberColor:'#4ECBFC',
            normalColor:'black',
            verifyText : '获取验证码',
            phoneNumber:'',
            verifyNumber:'',
            info:{
                name:'测试',
            }
        }
    }


    componentDidMount(){
        // this.props.navigation.setParams({callback:'hahaha'})
        // console.log(this.props.navigation);
    }
    componentWillUnmount(){
        this.setIntervar && clearInterval(this.setIntervar);
    }

    _passwordJudge = (text) => {
        if (text.length === 6 || text === '') {
            this.setState({
                passWordStatus: true,
            })
        }else if(text.length > 6 ){
            this.setState({
                passWordStatus: false,
            });
            Alert.alert('输出长度错误');
        } else {
            this.setState({
                passWordStatus: false,
                verifyNumber:text,
            })
        }
    };

    _usernameJudge = (text) => {
        if (/^1[34578]\d{9}$/.test(text) || text === '') {
            this.setState({
                userNameStatus: true,
                phoneNumber:text,
            })
        } else {
            this.setState({
                userNameStatus: false,
            })
        }
    };

    _login = () => {
        console.log('登录');
        let phoneNumber;
        let verifyNumber;
        if (this.state.phoneNumber){
            phoneNumber = this.state.phoneNumber;
        }else {
            Alert.alert('手机号为空或者输入错误，请重新输入');
            return;
        }
        if (this.state.verifyNumber){
            verifyNumber=this.state.verifyNumber;
        }else {
            Alert.alert('密码为空或者错误，请重新输入');
            return;
        }

        let body = {
            username:phoneNumber,
            verifyNumber:verifyNumber,
        };

        Fetch.post(Config.api.user.login,body,(data)=>{
            console.log(data);
            // this.props.navigation.dispatch(resetAction);
        },(error)=>{
            console.log(error);
            Alert.alert(error.message);
        })

        // Request.post(Config.api.user.login,body,(data)=>{
        //     console.log(data);
        //
        //
        //
        // },(error)=>{
        //     console.log(error);
        //     Alert.alert(error.error);
        // });
    };

    _renderAccount = ()=> {
        return(
            <View style={{marginTop:0}}>
                <RTTextInput placeholder="用户名"
                             status={this.state.userNameStatus}
                             onChangeText={(text) =>this._usernameJudge(text)}
                             ref={(input) => this._usernameInput = input}
                             textInputRef='textInput'
                             iconName='md-person'
                />

                    <RTTextInput placeholder="密码"
                                 status={this.state.passWordStatus}
                                 onChangeText={(text) => this._passwordJudge(text)}
                                 ref={(input) => this._passwordInput = input}
                                 textInputRef='textInput'
                                 iconName='md-lock'
                    />

                <Text style={{marginTop:10}} onPress={()=>{
                        this._passwordInput.refs.textInput.clear();
                    }}>点我清空</Text>

                <TouchableOpacity style={styles.loginStyle} onPress={this._login}>
                    <Text style={{fontSize:FONT_SIZE(17)}}>
                        登录
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };

    _renderVerify = ()=> {
        // alert('验证');
        let hint = 10;
        this.setIntervar = setInterval(()=>{
            hint = --hint;
            if (hint == 0){
                this.setState({
                    verifyText:'获取验证码',
                });
                this.setIntervar && clearInterval(this.setIntervar);
            }else {
                this.setState({
                    verifyText: '剩余:' + hint,
                    // verifyNumber:'875858',
                    phoneNumber:'17123456789',
                    verifyNumber:'875851',
                    // phoneNumber:'17123456781',
                })
            }
        },1000);

    }

    _renderNumber = () => {
        return(
            <View style={{marginTop:0}}>
                <RTTextInput placeholder="手机号"
                             status={this.state.userNameStatus}
                             onChangeText={(text) =>this._usernameJudge(text)}
                             ref={(input) => this._usernameInput = input}
                             textInputRef='textInput'
                             iconName='md-person'
                             defaultValue={this.state.phoneNumber}
                />
                <View style={{flexDirection:'row'}}>
                    <RTTextInput placeholder="验证码"
                                 status={this.state.passWordStatus}
                                 onChangeText={(text) => this._passwordJudge(text)}
                                 ref={(input) => this._passwordInput = input}
                                 textInputRef='textInput'
                                 iconName='md-lock'
                                 defaultValue={this.state.verifyNumber}
                                 keyboardType={'decimal-pad'}
                                 returnKeyType={'go'}
                    />
                    <TouchableOpacity style={styles.verifyView}
                                      activeOpacity={0.7}
                                      onPress={this._renderVerify}
                    >
                        <Text>{this.state.verifyText}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{marginTop:10}} onPress={()=>{
                        this._passwordInput.refs.textInput.clear();
                    }}>点我清空</Text>
                <TouchableOpacity style={styles.loginStyle} onPress={this._login}>
                    <Text style={{fontSize:FONT_SIZE(17)}}>
                        登录
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

    _renderLogin = ()=>{
        return(
            <View style={styles.loginViewStyle}>
                <TouchableOpacity style={styles.quickLoginStyle}
                                  activeOpacity={0.9}
                                  onPress={()=>this.setState({
                                      loginMode:true,
                                      numberColor:'#4ECBFC',
                                      normalColor:'black',
                                  })}
                >
                    <Text style={[styles.quickText,{color:this.state.numberColor}]}>快捷登录</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.normalLoginStyle}
                                  activeOpacity={0.9}
                                  onPress={()=>this.setState({
                                      loginMode:false,
                                      numberColor:'black',
                                      normalColor:'#4ECBFC',
                                  })}
                >
                    <Text style={[styles.normalText,{color:this.state.normalColor}]}>普通登录</Text>
                </TouchableOpacity>

            </View>
        )
    }

    render() {
        let { state } = this.props.navigation;
        console.log('render');
        return (
            <View style={styles.container}>
                {this._renderLogin()}
                {this.state.loginMode ?
                     this._renderNumber()
                    : this._renderAccount()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loginStyle:{
        marginTop:20,
        width:SCREEN_WIDTH,
        height:44,
        backgroundColor:'#4ECBFC',
        justifyContent:'center',
        alignItems:'center'
    },
    loginViewStyle:{
        flexDirection:'row',
        height:44,
        backgroundColor:'#f0f0f0',
        borderBottomColor:'#ededed',
        borderBottomWidth:1,

    },
    quickLoginStyle:{
        width:SCREEN_WIDTH/2,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:'#4ECBFC',
        height:30,

    },
    normalLoginStyle:{
        width:SCREEN_WIDTH/2,
        alignSelf:'center',
        alignItems:'center'
    },
    quickText:{
        fontSize:FONT_SIZE(15)
    },
    normalText:{
        fontSize:FONT_SIZE(15)
    },
    verifyView:{
        backgroundColor:'#4ECBFC',
        height:35,
        width:80,
        position:'absolute',
        right:5,
        top:5,
        alignItems:'center',
        justifyContent:'center'
    }

});

Login.PropTypes = {
    navigate:React.PropTypes.object,
    closeClick:React.PropTypes.object,
};


