/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList, TouchableOpacity
} from 'react-native';

import { LargeList } from "react-native-largelist";

import { System, handleImageSize } from '../../utils';
import AutoResponsive from 'autoresponsive-react-native';


import FastImage  from 'react-native-fast-image';

const height = parseInt(Math.random() * 20 + 12) * 10;

import { loadGankData } from '../../servers/gank';
import Masonry, {_insertIntoColumn} from "react-native-masonry";
import GankMobx  from '../../mobx/Gank';
import { observer } from 'mobx-react';

type Props = {};
@observer
export class Gank extends Component<Props> {


  constructor(props){
    super(props);

    this.GankMobx = new GankMobx();


    // this.state = {
    //   data: [],
    //   defaultData : [],
    //   refreshing: true
    // }
  }

   componentDidMount() {


    this.GankMobx.fetchGankData();

    // console.log('componentDidMount');
    // this.fetchData();

    // loadGankData().then(data=>{
    //   // console.log(data.results)
    //   // this.setState({data: data.results})
    //
    //   let urls = [];
    //
    //
    //   data.results.map((item) => handleImageSize(item, 2))
    //     .map(task => task.fork(
    //             (err) => console.warn('Image failed to load'),
    //             (gank) => {
    //               // console.log(gank);
    //               this.setState({data: gank})
    //             })
    //         )
    //
    //
    //   // data.results.map((item, index)=>{
    //   //   let url = {};
    //   //   url.uri = item.url;
    //   //   urls.push(url);
    //   // })
    //
    //   // console.log(urls);
    //   // this.setState({data: urls})
    //
    // })
    //   .catch(e=>{
    //     console.log(e);
    //   })

  }

  fetchData = () => {

    loadGankData().then(data => {
      let datas = [];
      data.results.map((item) => handleImageSize(item, 2))
        .map(task => task.fork(
          (err) => console.warn('Image failed to load'),
          (gank) => {
            // console.log(gank);
            datas.push(gank);
          })
        )
      console.log(datas);
      this.setState({
        data: datas,
        refreshing: false,
        defaultData: [{
          _id: 'test'
        }],
      })
    })
      .catch(e=>{
        console.log(e);
      })
  }

  largeList(data) {
    return(
      <LargeList
        style={{ flex: 1, backgroundColor:'orange' }}
        bounces={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.fetchData()
        }}
        // safeMargin={600}
        numberOfRowsInSection={()=>this.state.data.length}
        // numberOfSections={()=>this.props.numberOfSections}
        renderCell={Gank.renderItem.bind(this)}
        heightForCell={() => 88}
      />
    )
  }

  getAutoResponsiveProps() {
    return {
      itemMargin: 4,
    };
  };

  renderItem = () => {
    const { navigate } = this.props.navigation;
    const { gankData } = this.GankMobx;

    console.log(gankData.slice());

    // data.map((item, i) => {
    //   console.log(item);
    //   return (
    //     <Image
    //       key={i}
    //       source={{uri: item.url}}
    //       style={{
    //         height: item.resizeSize.height,
    //         width: item.resizeSize.width,
    //         // marginHorizontal: 10,
    //         // marginVertical: 10,
    //       }}
    //     />
    //   );
    // }, this);

    return(
      <AutoResponsive {...this.getAutoResponsiveProps()}>
        { WelfareItem(navigate, gankData)}
      </AutoResponsive>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        {/*{data.length > 0 ?*/}
          {/*<Masonry*/}
            {/*sorted*/}
            {/*bricks={this.state.data}*/}
            {/*columns={2}*/}
            {/*customImageComponent={FastImage}*/}
            {/*spacing={2}*/}
          {/*/>*/}
          {/*:null*/}
        {/*}*/}
        

        <FlatList
          data={this.GankMobx.defaultData}
          style={{backgroundColor:'#F5F5F5', flex:1}}
          keyExtractor={item => item._id}
          numColumns={2}
          onRefresh={this.GankMobx.fetchGankData}
          refreshing={this.GankMobx.refreshing}
          renderItem={this.renderItem}
          // onEndReached={this.fetchData}
          // onEndReachedThreshold={1}
          // removeClippedSubviews={true}

        />
      </View>
    );
  }
}

const WelfareItem = (navigate, dataSource) => {

  console.log(dataSource.slice());

  return dataSource.map((item, i) => {
    console.log(item);
    return (
        <Image
          key={i}
          source={{uri: item.url}}
          style={{
            height: item.resizeSize.height,
            width: item.resizeSize.width,
            // marginHorizontal: 10,
            // marginVertical: 10,
          }}
        />
    );
  }, this);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});