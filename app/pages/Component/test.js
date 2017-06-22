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
    Button,
    InteractionManager
} from 'react-native';

import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'MyTab' })
    ]
});

const navigateAction = NavigationActions.navigate({
    routeName: 'Gank',

    params: {title:'hahaha'},

    action: NavigationActions.navigate({ routeName: 'Gank'})
})

export default class Login extends Component {

    static navigationOptions = {
        
    }

    componentDidMount(){
    }


    _navigatePress = ()=> {
        this.props.navigation.dispatch(navigateAction)
    }

    _pushPress = () => {
        this.props.navigation.navigate('Test');
    }

    _resetPress () {
        console.log('重置');



        // this.props.navigation.dispatch(navigateAction);

        // this.props.navigation.navigate('Test');

        // this.props.navigation.navigate('GankStack');
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigation.dispatch(resetAction)
        });

        this.props.navigation.dispatch(navigateAction)

        InteractionManager.runAfterInteractions(()=>{


        });



    }

    _closePress= ()=>{
        this.props.navigation.goBack("SearchHistory");
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='跳转' onPress={()=>this._pushPress()} />
                <Button title='参数跳转' onPress={()=>this._navigatePress()} />
                <Button title='reset' onPress={()=>this._resetPress()} />
                <Button title='关闭' onPress={()=>this._closePress()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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

Login.PropTypes = {
    navigate:React.PropTypes.object,
    closeClick:React.PropTypes.object,
};


