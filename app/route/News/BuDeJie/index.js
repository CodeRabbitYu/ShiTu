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
  FlatList, Modal,
} from 'react-native';

import {loadBuDeJieData, loadWealPictureData} from "../../../servers/News";
import { TableList } from '../../../components';
import type {RTBDJList, RTWeal} from "../../../servers/News/interfaces";
import { BuDeJieMobx } from '../../../mobx/News/BuDeJieMobx';
import { observer } from "mobx-react";
import { BaseItem } from "./Components";
import type {NavigationState} from "react-navigation";

type Props = {
  type: number;
  navigate: NavigationState
};


@observer
export class BuDeJie extends React.Component<any, any> {

  BuDeJieMobx: BuDeJieMobx;

  constructor(props: Props) {
    super(props);
    this.BuDeJieMobx = new BuDeJieMobx();
    this.state = {
      isVisible: false
    }
  }

  onFetch = async ( value: any = this.BuDeJieMobx.maxtime, startFetch: Function, abortFetch: Function) => {
    try {
      await this.BuDeJieMobx.fetchBuDeJieData(this.props.type, value);
      startFetch(this.BuDeJieMobx.dataSource.slice(), 20)
    } catch (e) {
      abortFetch();
      console.log(e)
    }
  }

  renderItem = ( {item, index}: any ) => {
    const { navigate } = this.props;
    return(
      <BaseItem itemData={item} navigate={navigate} itemPress={()=>alert('123')}/>
    )
  }


  render() {
    return (
        <TableList
          style={{backgroundColor: 'white'}}
          onFetch={this.onFetch}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={20}
          paginationType={'value'}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});