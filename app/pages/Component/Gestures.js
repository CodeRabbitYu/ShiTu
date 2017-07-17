/**
 * Created by Rabbit on 2017/7/15.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    PanResponder
} from 'react-native';


let CIRCLE_SIZE = 80;

export  default  class App extends Component {
    _panResponder: {};
    _previousLeft: 0;
    _previousTop: 0;
    _circleStyles: {};
    // circle: null : ?{ setNativeProps(props: Object): void };

    constructor(props){
        super(props);
        // circle: (null : ?{ setNativeProps(props: Object): void });


    }



    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'green',
            }
        };
    }


    componentDidMount(){
        this._updateNativeStyles();
    }

    render() {
        return (
            <View
                style={styles.container}>
                <View
                    ref={(circle) => {
                    this.circle = circle;
                  }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                />
            </View>
        );
    }

    _highlight =() => {
        this._circleStyles.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight=()=> {
        this._circleStyles.style.backgroundColor = 'green';
        this._updateNativeStyles();
    }

    _updateNativeStyles= () =>{
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handleStartShouldSetPanResponder=(e: Object, gestureState: Object): boolean =>{
    // Should we become active when the user presses down on the circle?
        return true;
    }

    _handleMoveShouldSetPanResponder=(e: Object, gestureState: Object): boolean =>{
    // Should we become active when the user moves a touch over the circle?
        return true;
    }
    _handlePanResponderGrant = (e: Object, gestureState: Object) => {
        console.log('_handlePanResponderGrant');
        console.log(e,gestureState);
        this._highlight();
    }
    _handlePanResponderMove=(e: Object, gestureState: Object) =>{
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
        console.log('_handlePanResponderMove');
        console.log(e,gestureState);

        if (e.nativeEvent.changedTouches.length <= 1) {
            // 单指移动 or 翻页
            alert('单指');
        } else {
            // 双指缩放
            alert('双指');
        }

        this._updateNativeStyles();
    }
    _handlePanResponderEnd=(e: Object, gestureState: Object) =>{
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
        console.log('_handlePanResponderEnd');
        console.log(e,gestureState);
    }
}

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    container: {
        flex: 1,
        paddingTop: 64,
    },

});