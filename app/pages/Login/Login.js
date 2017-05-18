/**
 * Created by Rabbit on 2017/5/10.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../component/Button';

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

export default class Login extends Component {

    static navigationOptions = {
        tabBarVisible:false,
        // header:null,
    }

    constructor(props){
        super(props);
        let { state } = this.props.navigation;
        this.state = {
            title: state.title,
        }
    }

    componentDidMount(){
    }

    _closePress=()=>{
        console.log(this.props.navigation);
        this.props.navigation.dispatch(setParamsAction);
        console.log(this.props.navigation);
    }


    render() {
        let { state } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text>{this.state.title}</Text>
                <Button title='关闭' onPress={()=>this._closePress()} />
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


