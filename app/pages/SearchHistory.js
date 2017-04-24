/**
 * Created by Rabbit on 2017/4/24.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    FlatList,
} from 'react-native';

import {  View, Text, Image } from 'react-native-animatable';
import Realm from 'realm';
import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import Button from '../component/Button';

const HistorySchema = {
    name: 'History',
    primaryKey: 'id',
    properties: {
        id:         'string',
        imageURL:   'string',
        timestamp:  'int',
    }
};
let realm = new Realm({schema: [HistorySchema],});

@observer
export default class SearchHistory extends Component {
    @observable
    List = [];

    componentDidMount(){
        let list = [];
        let history = realm.objects('History');
        history.map((v,i) => {
            // console.log(v.id);
            list.push(v);
        });

        this.List = list;
        // console.log(list);
    }

    _timestamp = (timestamp) => {
        let newDate = new Date();
        newDate.setTime(timestamp);
        return(
            <Text style={{marginTop:5}}>
                {newDate.toLocaleString()}
            </Text>
        )
    };

    _images = (imageURL) => {
        imageURL = imageURL.replace('.jpeg','?imageView2/0/w/200/h/100.jpeg');
        console.log(imageURL);
        return(
            <Image
                source={{uri:imageURL}}
                style={{height:200,width:SCREEN_WIDTH/2-15}}
            />
        )
    };

    _itemPress = (item) => {
        console.log(item.id);
    };

    renderItem = (item)=> {
        return(
            <Button
                isCustom={true}
                onPress={() => this._itemPress(item)}
                customView={
                        <View animation="fadeIn"
                              useNativeDriver
                            >
                                {this._images(item.imageURL)}
                                {this._timestamp(item.timestamp)}
                        </View>
                    }
                />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.List}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>this.renderItem(item)}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5FCFF',
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:10,
    },
});
