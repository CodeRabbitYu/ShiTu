/**
 * Created by Rabbit on 2017/4/19.
 */
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
    TouchableOpacity,
    WebView,
    InteractionManager
} from 'react-native';
import ShiTu from './ShiTu';

import ProgressBarAnimated from '../component/ProgressBarAnimated';

import { NavigationActions } from 'react-navigation'

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

const setParamsAction = NavigationActions.setParams({
    params: {
        name:'hahah',
        title:'hahaha',
    },
    title:'hahaha',
    key: 'screen-123',
});

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'SearchHistory',params:{
            isVisible:false,
        }})
    ]
});

@observer
export default class Detail extends Component {

    // @observable
    // progress=0;
    @observable
    isProgress=false;

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            isProgress:false,
        }
    }

    componentDidMount(){
        console.log(this.props.navigation);
    }

    componentWillUnmount(){
        this.setIntervar && clearInterval(this.setIntervar);
    }

    _onNavigationStateChange = (navState)=> {
        // console.log(navState);
        console.log('获得数据啦？');
    };

    renderLoading = () => {

    };

    _renderLoading = ()=>{
        console.log('1111');
        return(
            <ProgressBarAnimated
                progress={this.state.progress}
                style={{
                        height:5,
                        width:SCREEN_WIDTH,
                        borderWidth:0,
                        borderRadius:0,
                        position:'relative',
                        top:0,
                        zIndex:99
                    }}
                filledColor='red'
                unfilledColor='white'
            />
        )
    };

// <TouchableOpacity onPress={()=>this.props.navigation.dispatch(setParamsAction)}>
// <Text>1111</Text>
// </TouchableOpacity>

    render() {
        const { state: { params: { data,title } } } = this.props.navigation;
        // console.log('111');
        let url = "http://image.baidu.com/wiseshitu?guess=1&" +
            "uptype=upload_wise&queryImageUrl=http://oo6mt5wjj.bkt.clouddn.com/" +
            "ba4ae069-b6fa-4d3c-9a75-d5ce59a3973d.jpeg&querySign=&simid=";
        // console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                {
                    !this.isProgress
                    ?

                        console.log('不加载')
                    :
                        <ProgressBarAnimated
                            progress={this.state.progress}
                            style={{
                                height:5,
                                width:SCREEN_WIDTH,
                                borderWidth:0,
                                borderRadius:0,
                                position:'absolute',
                                top:0,
                                zIndex:99,
                            }}
                            filledColor='#4ECBFC'
                            unfilledColor='#F5FCFF'
                        />
                }
                <WebView
                    style={styles.webView}
                    source={{uri:url,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={false}
                    onNavigationStateChange={this._onNavigationStateChange}
                    renderLoading={this.renderLoading}
                    startInLoadingState={true}
                    onLoadStart={()=>{
                        console.log('开始加载');
                        {/*this.setState({*/}
                            {/*isProgress:true,*/}
                        {/*});*/}
                        this.isProgress = true;

                        this.setIntervar = setInterval(()=>{
                            if (this.state.progress > 80){
                                return;
                            }
                            this.setState({
                                progress:this.state.progress + 1,
                            });
                        });
                    }}
                    onLoad={()=>{
                        {/*this.setState({*/}
                            {/*progress:100,*/}
                        {/*});*/}
                    }}
                    onLoadEnd={()=>{
                        console.log('加载结束');
                        console.log(this.state.progress);
                        this.setState({
                            progress:100,
                        });
                        InteractionManager.runAfterInteractions(()=> {
                            setTimeout(()=>{
                                this.isProgress = false;
                            },500);
                        });
                        this.setIntervar && clearInterval(this.setIntervar);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    webView:{
        height:SCREEN_HEIGHT-20,
        width:SCREEN_WIDTH,
        // backgroundColor:'white',
        // position:'absolute',
        // top:-49
    }
});