/**
 * Created by Rabbit on 2017/4/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    AsyncStorage,
    Modal,
    TouchableOpacity,
    Alert,
    StatusBar
} from 'react-native';
import Button from '../../component/Button';
import Login from '../Login/Login';
import LoginModal from '../../component/LoginModal';

export default class Main extends Component {

    async componentDidMount(){
        // this.props.navigation.setParams({title:'hjaha '})
        // console.log(this.props.navigation);
        let data = await AsyncStorage.getItem('TOKEN');
        // console.log(data);
        if (data === null){
            console.log('false');
            return(
                // Alert.alert('尚未登录')
                null
            )
        }else {
            console.log('true');
            return true;
        }
    }

    componentWillReceiveProps(){
        console.log('走吗?');
    }


    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }



    componentWillUnmount(){
        this.setState({modalVisible: false});
    }
    render() {
        // console.log('Main');
        const { navigate } = this.props.navigation;
        return (
            <View style={{marginTop: 22}}>
                <StatusBar
                    // backgroundColor="blue"
                    // barStyle="dark-content"
                    showHideTransition="slide"
                />

                {/*<LoginModal isVisible={this.state.modalVisible}/>*/}

                <TouchableOpacity onPress={() => {
                    navigate('Login',{
                        title:'Sousuo '
                    });
                }}>
                    <Text>登录按钮</Text>
                </TouchableOpacity>

            </View>
        );
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