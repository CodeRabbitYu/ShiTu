/**
 * Created by Rabbit on 2017/5/10.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../resources/timg.jpeg')}
                       style={[styles.menu,{display:'flex'}]}
                       animation="fadeIn"
                       useNativeDriver
                >
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    {
                        !this.isUpload ?  <BlurView
                                viewRef={this.state.viewRef}
                                blurType="light" blurAmount={5} style={styles.blur}>
                                <Text style={styles.textStyle}>
                                    {this.hintText}
                                </Text>
                                <Button
                                    backgroundColor={COLORS.appColor}
                                    style={{position: 'absolute'}}
                                    raised
                                    borderRadius={5}
                                    title='点我寻找!'
                                    animationType="bounceInLeft"
                                    onPress = {this._onPress}
                                />
                            </BlurView>
                            :
                            <BlurView blurType="light" blurAmount={5} style={styles.blur}>
                                <Progress.Circle
                                    showsText={true}
                                    color = {COLORS.appColor}
                                    progress={this.perent}
                                    size={130}
                                    formatText={()=>{
                                    return(
                                        <Text style={{fontSize:FONT_SIZE(17)}}>
                                            正在查找
                                        </Text>
                                    )
                                }}
                                />
                            </BlurView>
                    }
                </Image>
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

AppRegistry.registerComponent('ShiTu', () => ShiTu);
