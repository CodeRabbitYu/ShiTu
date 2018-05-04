/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import {System} from "../../../utils";
import { MasonryList} from "../../../components";

import { WealPictureMobx } from '../../../mobx/News';

import { observer} from 'mobx-react'

type Props = {};
@observer
export default class index extends React.Component<Props> {

  WealPictureMobx: WealPictureMobx;

  constructor(props: Props){
    super(props);
    this.WealPictureMobx = new WealPictureMobx();
  }

  async componentDidMount() {
    await this.WealPictureMobx.fetchWealPictureData(1);
  }

  renderItem = ({ item, index, column }: any) => {
    return(
      <Image source={{uri: item.url}}
             style={[
               styles.cell,
               { height: item.height, backgroundColor: 'white'},
             ]}
      />
    )
  }

  render() {

    const { dataSource, isRefreshing, refreshData, loadMoreData } = this.WealPictureMobx

    return (
      <MasonryList
        onRefresh={refreshData}
        refreshing={isRefreshing}
        data={dataSource.slice()}
        renderItem={this.renderItem}
        getHeightForItem={({ item }) => item.height + 2}
        numColumns={2}
        keyExtractor={item => item._id}
        // ListEmptyComponent={()=> <Text>222222</Text>}
        ListHeaderComponent={()=><View/>}
        ListFooterComponent={()=>
          !isRefreshing
            ?
            <View style={{height: 50, flex:1,  alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={'small'}/>
            </View>
            :
            null
        }
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});