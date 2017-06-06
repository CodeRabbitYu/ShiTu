/**
 * Created by Rabbit on 2017/5/10.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    AsyncStorage,
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
        if (text !== '111') {
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

        if (text !== '111') {
            this.setState({
                accountError: true,
                accountSuccess: false,
            })

        } else {
            this.setState({
                accountError: false,
                accountSuccess: true,
            })
        }
    };
    render() {
        let { state } = this.props.navigation;
        console.log('render');
        return (
            <Container>
                <Content>
                    <Form>
                        <Item success={this.state.accountSuccess}
                              error={this.state.accountError}
                              style={{borderBottomColor:'blue'}}
                              floatingLabel
                        >
                            <Icon name='md-contact' />
                            <Input placeholder="账号"
                                   ref = {(input) => this.accountInput = input}
                                   onChangeText={(text) =>this._accountJudge(text)}/>
                        </Item>
                        <Item success={this.state.passwordSuccess}
                              error={this.state.passwordError}>
                            <Icon name='md-lock' />
                            <Input placeholder="密码"
                                   onChangeText={(text) =>this._passwordJudge(text)}
                            />
                        </Item>
                    </Form>
                    <FormLabel>Name</FormLabel>
                    <FormInput placeholder='账号'
                               onChangeText={(text)=>{}}
                               selectionColor='red'/>
                    <RTTextInput placeholder="密码"
                                 selectionColor='green'
                                 containerStyle={{borderBottomColor:'green'}}
                    />
                </Content>

            </Container>
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


