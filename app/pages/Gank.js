/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import * as Animatable from 'react-native-animatable';

export default class Gank extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Animatable.Text animation="zoomInUp"
                                 duration={5000}>
                    Zoom me up, Scotty
                </Animatable.Text>
                <Animatable.Text animation="slideInDown"
                                 iterationCount={3}
                                 direction="alternate"
                                 easing="ease-in-out">
                    Up and down you go
                </Animatable.Text>
                <Animatable.Text animation="pulse"
                                 easing="ease-out"
                                 iterationCount="infinite"
                                 duration={4000}
                                 delay={2000}
                                 style={{ textAlign: 'center' }}>
                    ❤
                ️</Animatable.Text>

                <TouchableWithoutFeedback onPress={
                    () => this.refs.view.bounce(300)
                            .then((endState) =>
                            console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'))
                }>
                <Animatable.View ref="view">
                    <Text>Bounce me!</Text>
                </Animatable.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() =>
                this.refs.text.transitionTo(
                    {opacity: 0.2}
                    )}>
                <Animatable.Text ref="text">Fade me!</Animatable.Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    icon:{
        width:37,
        height:37,
    }
});