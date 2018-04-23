/**
 * @flow
 * Created by Rabbit on 2018/4/21.
 */

import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';

import {LargeList} from "react-native-largelist";

import {handleImageSize, System} from '../../utils';
import AutoResponsive from 'autoresponsive-react-native';
import {Button} from '../../components'

import FastImage from 'react-native-fast-image';
import {loadGankData} from '../../servers/Gank';

import GankMobx from '../../mobx/Gank';
import {observer} from 'mobx-react';
import {action} from 'mobx';

const height = parseInt(Math.random() * 20 + 12) * 10;

type Props = {};
@observer
export class News extends Component<Props> {


  constructor(props){
    super(props);
    this.GankMobx = new GankMobx();
  }

  async componentDidMount() {
    await this.GankMobx.fetchGankData();
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

  renderItem({item}){
    // const { navigate } = this.props.navigation;
    // const { gankData } = this.GankMobx;

    return(
      <View style={{backgroundColor: 'green', width: System.SCREEN_WIDTH / 2, height: 88,}}>
        <Text>{item.desc}</Text>
      </View>
    )


    // return(
    //   <AutoResponsive {...News.getAutoResponsiveProps()}>
    //     { WelfareItem(navigate, gankData) }
    //     {/*<WelfareItem navigate={navigate} dataSource={gankData} style={{width: System.SCREEN_WIDTH, height: System.SCREEN_HEIGHT}}/>*/}
    //   </AutoResponsive>
    // )
  }

  @action.bound
  async refreshList() {
    this.GankMobx.clearList();
    await this.GankMobx.fetchGankData();
  }


  render() {
    const { defaultData, fetchGankData, fetchMoreData, isRefreshing, refreshList } = this.GankMobx;

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

const WelfareItem = (navigate, dataSource) => {
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