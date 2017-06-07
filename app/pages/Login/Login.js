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
            accountSuccess:true,
            accountError:false,
            passwordSuccess:true,
            passwordError:false,
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
        if (text.length !== 6) {
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

    _accountJudge = (text) => {

        if (/^1[34578]\d{9}$/.test(text)) {
            this.setState({
                accountError: false,
                accountSuccess: true,
            })

        } else {
            this.setState({
                accountError: true,
                accountSuccess: false,
            })
        }
    };
    render() {
        let { state } = this.props.navigation;
        console.log('render');
        return (
            <View>

                    <RTTextInput placeholder="用户名"
                                 success={this.state.accountSuccess}
                                 successColor='#4ECBFC'
                                 error={this.state.accountError}
                                 errorColor='red'
                                 onChangeText={(text) =>this._accountJudge(text)}
                                 ref={(input) => this._RTInput = input}
                                 textInputRef='textInput'
                                 iconName='md-person'
                    />
                    <RTTextInput placeholder="密码"
                                 success={this.state.passwordSuccess}
                                 successColor='#4ECBFC'
                                 error={this.state.passwordError}
                                 errorColor='red'
                                 onChangeText={(text) =>this._passwordJudge(text)}
                                 ref={(input) => this._RTInput = input}
                                 textInputRef='textInput'
                                 iconName='md-lock'
                    />


                    <Text style={{marginTop:10}} onPress={()=>{
                        this._RTInput.refs.textInput.clear();
                    }}>点我清空</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});

Login.PropTypes = {
    navigate:React.PropTypes.object,
    closeClick:React.PropTypes.object,
};


