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
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {  View, Text, Image } from 'react-native-animatable';
import Realm from 'realm';
import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import Button from '../../component/Button';

import Icon from 'react-native-vector-icons/Ionicons';


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

export default class SearchHistory extends Component {
        static navigationOptions = {

        // cardStack- 配置card stack
        cardStack:{
            // 是否允许通过手势关闭该界面，在iOS上默认为true，在Android上默认为false
            gesturesEnabled:true
        }
    };

    constructor(props){
        super(props);
        this.state = {
            ListArr : null,
        }
    }

    componentDidMount(){
        console.log(this.props);

        let list = [];
        let history = realm.objects('History');
        // let times = history.filtered('timestamp = "ASC"');
        // console.log(times);
        // console.log(times[1]);
        let times = history.sorted('timestamp');

        times.map((v,i) => {
            // console.log(v.id);
            list.push(v);

        });
        list.reverse();
        // console.log(list.length);
        this.setState({
            ListArr:list,
        });
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

        let imageWidth = SCREEN_WIDTH/2-15;
        let imageHeight = imageWidth * 1.15;

        let requestWidth = imageWidth + 80;
        let requestHeight = imageHeight + 80;

        // imageURL = imageURL+ '?imageView2/0/w/'+imageWidth.toFixed(0)+'/h/'+imageHeight.toFixed(0);

        imageURL = `${imageURL}?imageView2/0/w/${requestWidth.toFixed(0)}/h/${requestHeight.toFixed(0)}`;

        // console.log(imageURL);
        return(
            <Image
                source={{uri:imageURL}}
                style={{height:imageHeight,width:imageWidth}}
            />
        )
    };

    _itemPress = (item) => {
        console.log(item.id);

        this.props.navigation.navigate('Test');

        // const { navigate } = this.props.navigation;
        // navigate('WelfarePicture',{
        //     title:'图片详情',
        //     url:item.imageURL,
        //     isVisible:true
        // });
    };

    renderItem = (item)=> {
        const { navigate } = this.props.navigation;
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
                    data={this.state.ListArr}
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
