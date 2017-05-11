/**
 * Created by Rabbit on 2017/5/11.
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
    TouchableOpacity
} from 'react-native';
import Button from '../component/Button';

export default class LoginModal extends Component {
    async componentDidMount(){
        let data = await AsyncStorage.getItem('TOKEN');
        // console.log(data);
        if (data === null){
            console.log('false');
            return(
                null
            )
        }else {
            console.log('true');
            return true;
        }
    }

    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    render() {
        // console.log('Main');
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                   
                </Modal>

                <TouchableOpacity onPress={() => {
                                              this.setModalVisible(true)
                                            }}>
                    <Text>Show Modal</Text>
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