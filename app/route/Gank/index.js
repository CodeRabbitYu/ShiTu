/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import {imageSize, System} from '../../utils';
import AutoResponsive from 'autoresponsive-react-native';
import {Button, TableList, FastImage} from '../../components'

import {loadGankData} from '../../servers/Gank';

import {observer} from 'mobx-react';

@observer
export class Gank extends React.Component<any> {

  static getAutoResponsiveProps() {
    return {
      itemMargin: 4,
    };
  };

  static renderItem({item}: any){
    return (
      <AutoResponsive {...Gank.getAutoResponsiveProps()}>
        { WelfareItem(item.data) }
      </AutoResponsive>
    )
  }

  onFetch = async (page: number = 1, startFetch: any, abortFetch: any) => {
    try {
      let data = await loadGankData(page, '福利', 1000);
      let imageData = [];
      data.results.map((item) => imageSize(item, 2))
        .map(task => task.fork(
          (err) => {
            console.warn('Image failed to load')
            // console.log('Image failed to load', err);
          },
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
        renderItem={Gank.renderItem}
        numColumns={2}
        keyExtractor={(item) => item._id}
      />
    )
  }
}

const WelfareItem = (dataSource) => {
  console.log(dataSource);
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