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
  FlatList, TouchableOpacity
} from 'react-native';

import { LargeList } from "react-native-largelist";

import { System, handleImageSize } from '../../utils';
import AutoResponsive from 'autoresponsive-react-native';
import { Button } from '../../components'

import FastImage  from 'react-native-fast-image';

const height = parseInt(Math.random() * 20 + 12) * 10;

import { loadGankData } from '../../servers/gank';
import Masonry, {_insertIntoColumn} from "react-native-masonry";

import GankMobx  from '../../mobx/Gank';
import { observer } from 'mobx-react';
import { action } from 'mobx';

type Props = {};
@observer
export class Gank extends Component<Props> {


  constructor(props){
    super(props);

    this.GankMobx = new GankMobx();


    this.state = {
      data: [],
      defaultData : [],
      refreshing: true,
      gankData: [],
    }
  }

   componentDidMount() {


    this.GankMobx.fetchGankData();

    // console.log('componentDidMount');
    // this.fetchData();

    // loadGankData().then(data=>{
    // console.log(data.results)
    // this.setState({data: data.results})
    //   let urls = [];
    //   data.results.map((item) => handleImageSize(item, 2))
    //     .map(task => task.fork(
    //             (err) => console.warn('Image failed to load'),
    //             (gank) => {
    //               // console.log(gank);
    //               this.setState({data: gank})
    //             })
    //         )
    //   data.results.map((item, index)=>{
    //     let url = {};
    //     url.uri = item.url;
    //     urls.push(url);
    //   })
    //
    //   console.log(urls);
    //   this.setState({data: urls})
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

            // console.log(datas);

          },

          this.setState({
            refreshing: false,
            gankData: datas,
            defaultData: [{_id : 'test'}],
          })

          )
        )

      // console.log(datas);
      // this.setState({
      //   refreshing: false,
      //   gankData: datas,
      //   defaultData: [{_id : 'test'}],
      // })

      // console.log(datas);
      // this.setState({
      //   data: datas,
      //   refreshing: false,
      //   defaultData: [{
      //     _id: 'test'
      //   }],
      // })

      let urls = [];
      data.results.map((item, index)=>{
        let url = {};
        url.uri = item.url;
        urls.push(url);
      })
      this.setState({data: urls})


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
        renderCell={this.renderItem.bind(this)}
        heightForCell={() => 88}
      />
    )
  }

  static getAutoResponsiveProps() {
    return {
      itemMargin: 4,
    };
  };

  @action.bound
  renderItem(){
    const { navigate } = this.props.navigation;
    const { gankData } = this.GankMobx;
    return(
      <AutoResponsive {... Gank.getAutoResponsiveProps()}>
        { WelfareItem(navigate, gankData)}
        {/*<WelfareItem navigate={navigate} dataSource={gankData}/>*/}
      </AutoResponsive>
    )
  }

  render() {

    // console.log(this.GankMobx.gankData.slice());

    const { defaultData, fetchGankData, refreshing } = this.GankMobx;


    // const { refreshing, defaultData } = this.state;

    return (
      <View style={styles.container}>

        {/*{this.state.data.length > 0 ?*/}
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
            data={defaultData.slice()}
            style={{ backgroundColor: '#F5F5F5', flex: 1}}
            keyExtractor={item => item._id}
            numColumns={2}
            onRefresh={fetchGankData}
            refreshing={refreshing}
            renderItem={this.renderItem.bind(this)}
            // onEndReached={fetchGankData}
            // onEndReachedThreshold={0}
            // removeClippedSubviews={true}
          />
      </View>
    );
  }
}

const WelfareItem = (navigate, dataSource) => {
  // console.log(props);
  // const { navigate, dataSource } = props;
  return dataSource.map((item, i) => {
    // console.log(item);
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