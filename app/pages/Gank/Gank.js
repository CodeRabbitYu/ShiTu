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
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import WelfareContainer from './WelfareContainer';
import GankListContainer from './GankListContainer';

export default class Gank extends Component {
    constructor(props){
        super(props);
        const { navigate } = this.props.navigation;
        // console.log(navigate);
        this.state = {
            typeArr : [
                {'title':'福利', 'type':'福利','navigate':navigate},
                {'title':'iOS', 'type':'iOS','navigate':navigate},
                {'title':'Android', 'type':'Android','navigate':navigate},
                {'title':'前端', 'type':'前端','navigate':navigate},
                {'title':'休息视频 ', 'type':'休息视频','navigate':navigate},
                {'title':'拓展资源', 'type':'拓展资源','navigate':navigate}
            ],
        }
    }

    _onChangeTab = (i) =>{
        // console.log(i);
    };

    _onScroll = (e) =>{
        // console.log(e);
    }
    render() {

        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar />}
                tabBarActiveTextColor='#4ECBFC'
                tabBarInactiveTextColor='black'
                tabBarBackgroundColor='white'
                tabBarUnderlineStyle={{backgroundColor:'#4ECBFC',height:2}}
                onScroll={(e) => this._onScroll(e)}
                onChangeTab={(i) => this._onChangeTab(i)}
                tabBarTextStyle={{fontSize:FONT_SIZE(15)}}
            >
                {
                    this.state.typeArr.map((item, i) => {
                       if (i===0){
                           return (
                               <WelfareContainer key={i}
                                                 tabLabel={item.title}
                                                 type={item.type}
                                                 navigate={item.navigate}
                               />
                           );
                       }
                        {/*let imageWidth  = SCREEN_WIDTH / 2 - 15;*/}
                        {/*let imageHeight = imageWidth * 1.15;*/}
                        {/*let text = parseInt(Math.random()*100 + imageHeight);*/}
                            return (
                                <GankListContainer key={i}
                                                   tabLabel={item.title}
                                                   type={item.type}
                                                   style={{backgroundColor:'white',flex:1}}
                                                   navigate={item.navigate}
                                />
                            )

                    })
                }
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
});