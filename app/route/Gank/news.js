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

  componentDidMount() {
  }


  static getAutoResponsiveProps() {
    return {
      itemMargin: 4,
    };
  };

  renderItem({item}){
    return (
      <AutoResponsive {...News.getAutoResponsiveProps()}>
        { WelfareItem(item.data) }
      </AutoResponsive>
    )
  }

  onFetch = async (page = 1, startFetch, abortFetch) => {
    let url = `http://gank.io/api/data/%E7%A6%8F%E5%88%A9/1000/${page}`;
    try {
      let data = await Fetch.get(url);
      let imageData = [];
      data.results.map((item) => handleImageSize(item, 2))
        .map(task => task.fork(
          (err) => console.warn('Image failed to load'),
          (gank) => {
            imageData.push(gank);
            startFetch([{_id: '123', data: imageData}], 20)
          })
        )
    } catch (e) {
      abortFetch()
    }

  }

  render() {
    return(
      <TableList
        onFetch={this.onFetch}
        renderItem={this.renderItem}
        numColumns={2}
        keyExtractor={(item) => item._id}
      />
    )
  }
}

const WelfareItem = (dataSource) => {
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