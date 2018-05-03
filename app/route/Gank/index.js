/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';
import {Text, View} from "react-native";

import {imageSize, System} from '../../utils';
import {Button, TableList, FastImage} from '../../components'

import {loadGankData, RGank} from '../../servers/Gank';

import {observer} from 'mobx-react';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';


type State = {
  typeArr: Array<any>
}

@observer
export class Gank extends React.Component<any, State> {

  componentDidMount() {
    // console.log('Gank')
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

  static renderItem({item}: any): any{

    return(
      <View style={{height: 80}}>
        <Text>{item.desc}</Text>
      </View>
    )
  }

  onFetch = async (page: number = 1, startFetch: any, abortFetch: any) => {
    try {
      let data = await loadGankData(page, 'iOS');
      let imageData = [];
      console.log(data);

      startFetch(data.results, 20)

    } catch (e) {
      abortFetch()
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
                <View type={item.type} tabLabel={item.title} key={i}>
                  <Text>{item.title}</Text>
                </View>

              );
            })
        }
      </ScrollableTabView>
    )
  }
}
