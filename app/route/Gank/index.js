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
  FlatList
} from 'react-native';

import { LargeList } from "react-native-largelist";

import { System } from '../../utils';

import FastImage  from 'react-native-fast-image';

const height = parseInt(Math.random() * 20 + 12) * 10;

import { loadGankData } from '../../servers/gank';
import Masonry from "react-native-masonry";

type Props = {};
export class Gank extends Component<Props> {


  constructor(props){
    super(props);
    this.state = {
      data: [],
      refreshing: true
    }
  }

  componentDidMount() {
    loadGankData().then(data=>{
      console.log(data.results)
      // this.setState({data: data.results})

      let urls = [];


      data.results.map((item, index)=>{
        let url = {};
        url.uri = item.url;
        url.onPress = () => alert(item.url);
        urls.push(url);
      })



      console.log(urls);
      this.setState({data: urls})

    })
      .catch(e=>{
        console.log(e);
      })

    // this.fetchData()
  }

  fetchData = () => {
    let url = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/20/1';
    url = 'http://gank.io/api/data/iOS/20/1';

    // fetch(url)
    //   .then(res=>res.json())
    //   .then( data => {
    //     console.log(data)
    //     this.setState({
    //       data: data.results,
    //       refreshing: false
    //     });
    //     // this.largeList.reloadData()
    //   })
    //   .catch(error =>{
    //     console.log(error);
    //   })
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


  static renderItem({item}){
    // console.log(msg.url);
    return(
        <Text style={{width: System.SCREEN_WIDTH / 2, backgroundColor:'red', marginTop: 10}}>
          {item.publishedAt}
        </Text>
    )

  }


  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>

        {/*<FastImage source={{uri:'https://ws1.sinaimg.cn/large/610dc034ly1fp9qm6nv50j20u00miacg.jpg'}}*/}
                   {/*style={{height:100, width: 100}}*/}
        {/*/>*/}
        {data.length > 0 ?
          <Masonry
            sorted
            bricks={this.state.data}
            columns={2}
            customImageComponent={FastImage}
            spacing={2}
          />
          :null
        }
        

        {/*<FlatList*/}
          {/*data={this.state.data}*/}
          {/*style={{backgroundColor:'#F5F5F5',flex:1}}*/}
          {/*keyExtractor={item => item._id}*/}
          {/*numColumns={2}*/}
          {/*initialNumToRender={6}*/}
          {/*onRefresh={this.fetchData}*/}
          {/*refreshing={this.state.refreshing}*/}
          {/*renderItem={Gank.renderItem}*/}
          {/*onEndReached={this.fetchData}*/}
          {/*onEndReachedThreshold={1}*/}
          {/*removeClippedSubviews={false}*/}

        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});