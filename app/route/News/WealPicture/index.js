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
import { MasonryList } from "../../../components";

import { WealPictureMobx } from '../../../mobx/News';

import { observer} from 'mobx-react'
import { Button, FastImage } from "../../../components";
import {BuDeJie} from "../index";
import {WealPictureDetail} from "../WealPictureDetail";

type Props = {
  navigation: any,
};
@observer
export class WealPicture extends React.Component<Props> {

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
      <Button
        onPress={()=> this.props.navigation.navigate('WealPictureDetail', {url: item.url})}
      >
        <FastImage source={{uri: item.url}}
               style={[
                 styles.cell,
                 { height: item.height, backgroundColor: 'white'},
               ]}
        />
      </Button>

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