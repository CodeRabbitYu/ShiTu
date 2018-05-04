/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';
import {Text, View} from "react-native";

import {imageSize, System} from '../../utils';
import {Button, TableList, FastImage} from '../../components'

// import {loadGankData, RGank} from '../../servers/News';

import {observer} from 'mobx-react';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import WealPicture from './WealPicture';


type State = {
  typeArr: Array<any>
}

@observer
export class Gank extends React.Component<any, State> {

  componentDidMount() {
    this.props.navigation.setParams({
      title: '百思不得姐',
    })
  }

  constructor(props: any){
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      typeArr : [
        {'title': '福利', 'type': '福利', 'navigate': navigate},
        {'title': 'iOS', 'type': 'iOS','navigate': navigate},
        {'title': 'Android', 'type':'Android','navigate': navigate},
        {'title': '前端', 'type': '前端','navigate': navigate},
        {'title': '休息视频 ', 'type': '休息视频','navigate': navigate},
        {'title': '拓展资源', 'type': '拓展资源','navigate': navigate}
      ],
    }
  }


  render() {
    return(
      <ScrollableTabView
        renderTabBar={() => <ScrollableTabBar />}
        tabBarActiveTextColor='#4ECBFC'
        tabBarInactiveTextColor='black'
        tabBarBackgroundColor='white'
        tabBarUnderlineStyle={{backgroundColor:'#4ECBFC',height:2}}
        // onScroll={(e) => this._onScroll(e)}
        // onChangeTab={(i) => this._onChangeTab(i)}
        tabBarTextStyle={{fontSize: 15}}
      >
        {
          this.state.typeArr.map((item, i) => {
              return (
                <WealPicture type={item.type} tabLabel={item.title} key={i}>
                  <Text>{item.title}</Text>
                </WealPicture>

              );
            })
        }
      </ScrollableTabView>
    )
  }
}
