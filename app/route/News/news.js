/**
 * Created by Rabbit on 2018/4/21.
 */

import React, {Component, PureComponent} from 'react';
import {FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {LargeList} from "react-native-largelist";

import {imageSize, System} from '../../utils';
import AutoResponsive from 'autoresponsive-react-native';
import {Button, Fetch, TableList} from '../../components'

import FastImage from 'react-native-fast-image';
import {loadWealPictureData} from '../../servers/News';

import GankMobx from '../../mobx/News';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import {Gank} from "./index";

import MasonryList from '@appandflow/masonry-list'
const COLORS = ['green', 'blue', 'red'];
const DATA = Array.from({ length: 20 }).map((_, i) => ({
  id: `item_${i}`,
  height: Math.round(Math.random() * 100 + 50),
  color: COLORS[i % COLORS.length],
  resizeSize: {
    height: Math.round(Math.random() * 100 + 50),
  }
}));

function AddData(length = 20) {
  const DATA = Array.from({ length }).map((_, i) => ({
    id: `item_${i}`,
    height: Math.round(Math.random() * 100 + 50),
    color: COLORS[i % COLORS.length],
    resizeSize: {
      height: Math.round(Math.random() * 100 + 50),
    }
  }));
  return DATA
}


let loadMoreNumber = []


@observer
export class News extends Component<any> {

  // timer: any;

  state = {
    isRefreshing: false,
    dataSource: [],
    results: [],
    imageData: [],
    page: 1,
  };

  async componentDidMount() {
    await this.fetchData(this.state.page)
  }

  handleImageToSmallSize(url){
    return url.replace('large','bmiddle');
  }

  fetchData = async (page: number) => {

    try {
      let data = await loadWealPictureData()

      let results = data.results;

      results.map((item, i) => {
        let imageWidth = System.SCREEN_WIDTH / 2 - 15;
        let imageHeight = imageWidth * 1.15;
        imageHeight = parseInt(Math.random() * 100 + imageHeight);
        item.height = imageHeight;
        item.width = imageWidth;
        item.url = item.url;
      });


      setTimeout(()=> {
        if (page !== 1) {
          console.log('page不等于1', page);
          this.setState({
            page: page,
            dataSource : this.state.dataSource.concat(results)
          });
        } else {
          this.setState({
            page: 1,
            dataSource: results,
          });
          console.log('page等于1', page);
        }
      },500);
    } catch (e) {
    }
  }

  loadMoreData = (distanceFromEnd: number) => {

    if (loadMoreNumber.length === 2) loadMoreNumber = [];

    loadMoreNumber.push(distanceFromEnd);

    let page = this.state.page;

    if (loadMoreNumber.length === 2){
      page += 1;
      this.fetchData(page)
    }

  }
  _refreshRequest = () => {
    this.setState({ isRefreshing: true });
    this.fetchData(1)
  };

  renderItem = ({ item, index, column }) => {
    return(
      <Cell item={item} index={column} />
    )
  }

  render() {

    return (
      <MasonryList
        onRefresh={this._refreshRequest}
        refreshing={this.state.isRefreshing}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        getHeightForItem={({ item }) => item.height + 2}
        numColumns={2}
        keyExtractor={item => item._id}
        // ListEmptyComponent={()=> <Text>222222</Text>}
        ListHeaderComponent={()=><Text>333333</Text>}
        ListFooterComponent={()=>
          <View style={{height: 50, flex:1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'}/>
          </View>
        }
        onEndReachedThreshold={0.1}
        onEndReached={this.loadMoreData}
      />
    );
  }
}

const Cell = (props) => {
  // console.log(props);
  const { item } = props;
  return(
    <Image source={{uri: item.url}}
           style={[
             styles.cell,
             { height: item.height, backgroundColor: 'red'},
           ]}
    />
  )
}

class Cell1 extends PureComponent<any> {
  componentDidMount() {
    // console.warn('mount cell');
  }

  componentWillUnmount() {
    // console.warn('unmount cell');
  }

  render() {
    const { item, index } = this.props;

    return(
      <Image source={{uri: item.url}}
             style={[
               styles.cell,
               { height: item.height, backgroundColor: 'red'},
             ]}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  cell: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});