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
import Button from '../../component/Button';
import RTTextInput from '../../component/RTTextInput';

import Request from '../../common/Request';
import Config from '../../common/Config';

import { FormLabel, FormInput } from 'react-native-elements'

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import { Container, Content, Form, Item, Input,Label,Icon} from 'native-base';

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
            usernameSuccess:true,
            usernameError:false,
            passwordSuccess:true,
            passwordError:false,
            quickClick:true,
            normalClick:false,
        }
    }

    componentDidMount(){
        // this.props.navigation.setParams({callback:'hahaha'})
        console.log(this.props.navigation);
    }

    _closePress=()=> {
        console.log(this.props.navigation);
        // this.props.navigation.dispatch(setParamsAction);
        // console.log(this.props.navigation);

        let { state , goBack} = this.props.navigation;
        state.params.callback('hahaha');
        goBack();
    };

    _passwordJudge = (text) => {
        if (text.length <= 5) {
            this.setState({
                passwordError: true,
                passwordSuccess: false,
            })

        } else {
            this.setState({
                passwordError: false,
                passwordSuccess: true,
            })
        }
    };

    _usernameJudge = (text) => {
        if (/^1[34578]\d{9}$/.test(text)) {
            this.setState({
                usernameError: false,
                usernameSuccess: true,
            })

        } else {
            this.setState({
                usernameError: true,
                usernameSuccess: false,
            })
        }
    };

    _login = () => {
        console.log('登录');
        this.props.navigation.navigate('Test');

        let body = {
            username:'13130281857',
            password:'123456',
        };
        Request.post(Config.api.user.login,body,(data)=>{
            console.log(data);
        },(error)=>{
            console.log(error);
        });
    };

    _renderAccount = ()=> {
        return(
            <View style={{marginTop:30}}>
                <RTTextInput placeholder="用户名"
                             success={this.state.usernameSuccess}
                             successColor='#4ECBFC'
                             error={this.state.usernameError}
                             errorColor='red'
                             onChangeText={(text) =>this._usernameJudge(text)}
                             ref={(input) => this._usernameInput = input}
                             textInputRef='textInput'
                             iconName='md-person'
                />
                <RTTextInput placeholder="密码"
                             success={this.state.passwordSuccess}
                             successColor='#4ECBFC'
                             error={this.state.passwordError}
                             errorColor='red'
                             onChangeText={(text) => this._passwordJudge(text)}
                             ref={(input) => this._passwordInput = input}
                             textInputRef='textInput'
                             iconName='md-lock'
                />

                <Text style={{marginTop:10}} onPress={()=>{
                        this._passwordInput.refs.textInput.clear();
                    }}>点我清空</Text>

                <Text style={styles.loginStyle}
                      onPress={this._login}
                >
                    登录
                </Text>
            </View>
        )
    }

    _renderLogin = ()=>{
        return(
            <View style={{flexDirection:'row',height:44,backgroundColor:'red'}}>
                <TouchableOpacity style={styles.quickLoginStyle}

                >
                    <Text>快捷登录</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.normalLoginStyle}>
                    <Text style={styles.normalText}>普通登录</Text>
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
                {this.state.quickClick ?
                     this._renderAccount()
                    : null
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
        textAlign:'center',
        alignSelf:'center'
    },
    quickLoginStyle:{
        width:SCREEN_WIDTH/2,
        alignSelf:'center',
        alignItems:'center'
    },
    normalLoginStyle:{
        width:SCREEN_WIDTH/2,
        alignSelf:'center',
        alignItems:'center'
    },
    quickButton:{

    },
    quickText:{

    },
    normalButton:{

    },
    normalText:{

    }

});

Login.PropTypes = {
    navigate:React.PropTypes.object,
    closeClick:React.PropTypes.object,
};


