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
  FlatList
} from 'react-native';
import { LargeList } from "react-native-largelist";

type Props = {
  navigation: any
};
export class Main extends Component<Props> {

  componentDidMount() {
    console.log('我的');
    this.props.navigation.setParams({
      title: '我的',
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main</Text>
        {/*<LargeList*/}
          {/*style={{ flex: 1, backgroundColor:'orange' }}*/}
          {/*bounces={true}*/}
          {/*ref={ref => (this.largeList = ref)}*/}
          {/*refreshing={this.state.refreshing}*/}
          {/*onRefresh={() => {*/}
            {/*this.fetchData()*/}
          {/*}}*/}
          {/*// safeMargin={600}*/}
          {/*numberOfRowsInSection={() => this.state.data.length}*/}
          {/*// numberOfSections={()=>this.props.numberOfSections}*/}
          {/*renderCell={this.renderItem.bind(this)}*/}
          {/*heightForCell={() => 44}*/}
          {/*renderItemSeparator={()=><View/>}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});