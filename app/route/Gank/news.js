/**
 * @flow
 * Created by Rabbit on 2018/4/21.
 */

import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';

import {LargeList} from "react-native-largelist";

import {handleImageSize, System} from '../../utils';
import AutoResponsive from 'autoresponsive-react-native';
import {Button, Fetch, TableList} from '../../components'

import FastImage from 'react-native-fast-image';
import {loadGankData} from '../../servers/Gank';

import GankMobx from '../../mobx/Gank';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import {Gank} from "./index";

const height = parseInt(Math.random() * 20 + 12) * 10;

type Props = {};
@observer
export class News extends Component<Props> {


  constructor(props){
    super(props);
    // this.GankMobx = new GankMobx();
    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    // await this.GankMobx.fetchGankData();
  }


  static getAutoResponsiveProps() {
    return {
      itemMargin: 4,
    };
  };

  renderItem({item}){
    // const { gankData } = this.GankMobx;

    // const { data } = this.state;
    console.log(item.data);

    // return (
    //   <AutoResponsive {...News.getAutoResponsiveProps()}>
    //     { WelfareItem(item.data) }
    //   </AutoResponsive>
    // )

    return(
      <View style={{backgroundColor: 'green', width: System.SCREEN_WIDTH / 2, height: 88,}}>
        <Text>{item.desc}</Text>
      </View>
    )
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    let url = `http://gank.io/api/data/%E7%A6%8F%E5%88%A9/20/${page}`;
    url = `http://gank.io/api/data/iOS/20/${page}`;
    // let data = await loadGankData(page)

    let data = await Fetch.get(url);

    let imageData = [];

    data.results.map((item) => handleImageSize(item, 2))
      .map(task => task.fork(
        (err) => console.warn('Image failed to load'),
        (gank) => {
          // console.log(gank);
          imageData.push(gank);

          // startFetch([{_id: '123', data: imageData}], 20)
          // startFetch(data.results, 20)

        })
      )
    console.log(imageData)
    // this.setState({data: data.results})

    console.log(data);

    startFetch(page, 20)

  }

  render() {
    // const { defaultData, fetchGankData, fetchMoreData, isRefreshing, refreshList } = this.GankMobx;

    return(
      <TableList
        onFetch={this.onFetch}
        renderItem={this.renderItem}
        numColumns={2}
        keyExtractor={(item, index) => item._id}

      />
    )

    // const { refreshing, defaultData } = this.state;
    return (
      <FlatList
        data={defaultData.slice()}
        style={{  height: '100%', backgroundColor:'red'}}
        keyExtractor={item => item._id}
        numColumns={2}
        refreshing={isRefreshing}
        onRefresh={this.refreshList}
        renderItem={this.renderItem}
        onEndReached={fetchGankData}
        onEndReachedThreshold={0.01}
        // removeClippedSubviews={true}
      />
    );
  }
}

class WelfareItem1 extends React.PureComponent{
  render() {

    const { dataSource, style  } = this.props;

    return dataSource.map((item, i) => {
      return (
        <ScrollView style={style}>
          <Button style={[{height: item.resizeSize.height, width: item.resizeSize.width - 10 }]}
                  onPress={()=>alert(item.url)}
                  key={i}
          >
            <FastImage
              source={{uri: item.url}}
              style={{
                height: item.resizeSize.height,
                width: item.resizeSize.width,
              }}
            />
          </Button>
        </ScrollView>
      );
    }, this);
  }
}

const WelfareItem = (dataSource) => {
  // console.log(dataSource.length);
  // const { navigate, dataSource } = props;
  return dataSource.map((item, i) => {
    return (
      <Button style={{height: item.resizeSize.height, width: item.resizeSize.width}}
              onPress={()=>alert(item.url)}
              key={i}
      >
        <FastImage
          source={{uri: item.url}}
          style={{
            height: item.resizeSize.height,
            width: item.resizeSize.width,
            // marginHorizontal: 10,
            // marginVertical: 10,
          }}
        />
      </Button>
    );
  }, this);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});