/**
 * Created by Rabbit on 2017/12/16.
 */
import React from 'react';
import { StyleSheet, Text, View, BackHandler, StatusBar, DeviceEventEmitter } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';

// import { Theme } from 'teaset';

// import TabIcon from './Component/TabIcon';
// import TabMiddleIcon from './Component/TabMiddleIcon'

import { ShiTuContainer } from './containers/shitu';

import { GankContainer } from './containers/gank';

import Test1 from './containers/Test1';
import Test2 from './containers/Test2';


const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        // console.log('ACTION:',action,Actions.currentScene)
        // console.log('Actions:', Actions);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: 'white',
    // shadowOpacity: 1,
    // shadowRadius: 3,
});

const onBackPress = () => {
    console.log(Actions.state);
    if (Actions.state.index !== 0) {
        return false
    }
    Actions.pop()
    return true
}

const router = (...props) => (

    <Router createReducer={reducerCreate}
            getSceneStyle={getSceneStyle}
            backAndroidHandler={onBackPress}
    >
        <Modal
            hideNavBar

            transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
        >
            <Stack hideNavBar headerMode='screen' key="root"
                   transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })}
            >
                <Tabs
                    key="TabBar"        // 唯一标识
                    wrap={true}         // 自动使用自己的导航栏包装每个场景
                    showLabel={true}   // 显示文字
                    tabBarStyle={styles.tabBarStyle} // tabBar的样式
                    swipeEnabled={false}// 是否可以滑动
                    animationEnabled={false}    //切换动画
                    headerMode='screen' // 页面切换方式
                   // icon={TabIcon}      // 自定义Icon显示方式
                    lazy={true}         // 是否默认渲染tabbar
                    tabBarPosition={'bottom'}       // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部
                    activeBackgroundColor='white'   // 选中tabbar的背景色
                    inactiveBackgroundColor='white' // 未选中tabbar的背景色
                    activeTintColor='#4ECBFC'       // 选中tabbar图标的颜色
                    inactiveTintColor='#aaa'        // 未选中tabbar图标的颜色
                    // backToInitial={'none'}
                    backBehavior={'none'}
                >
                    <Stack key="ShiTu"
                           title={'识兔'}
                          // image={Images.ShiTu}
                          // selectedImage={Images.ShiTu}
                    >
                        <Scene component={ShiTuContainer} key="ShiTu_key"/>
                    </Stack>
                    <Stack key="Gank"
                           title={'干货'}
                        // image={Images.ShiTu}
                        // selectedImage={Images.ShiTu}
                    >
                        <Scene component={GankContainer} key="Gank_key"/>
                    </Stack>
                    <Stack key="Main"
                           title={'我的'}
                        // image={Images.ShiTu}
                        // selectedImage={Images.ShiTu}
                    >
                        <Scene component={GankContainer} key="Main_key"/>
                    </Stack>
                </Tabs>
                <Stack key="Test1" back>
                    <Scene component={Test1} key="Test1_key"/>
                </Stack>
                <Stack key="Test2" back>
                    <Scene component={Test2} key="Test2_key"/>
                </Stack>
            </Stack>

        </Modal>
    </Router>
);

export default router;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
        height:49,
    },
});