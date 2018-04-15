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
  Button
} from 'react-native';

import { LargeList } from "react-native-largelist";

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
    this.fetchData()
  }

  fetchData = () => {
    console.log('ssss')
    fetch('http://gank.io/api/data/Android/20/1')
      .then(res=>res.json())
      .then( data => {
        console.log(data)
        this.setState({
          data: data.results,
          refreshing: false
        });
        this.largeList.reloadData()
      })
      .catch(error =>{
        console.log(error);
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

  renderItem(section: number, row: number){
    let msg = this.state.data[row];
    console.log(msg);
    return(
      <Text>{msg.desc}</Text>
    )
  }


  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Text>Gank</Text>

        <LargeList
          style={{ flex: 1, backgroundColor:'orange' }}
          bounces={true}
          ref={ref => (this.largeList = ref)}
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

        {/*<Button title={'123'}*/}
                {/*onPress={()=>alert('123')}*/}
                {/*color={'red'}*/}
                {/*accessibilityLabel="Learn more about this purple button"*/}
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