/**
 * Created by Rabbit on 2017/4/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
} from 'react-native';

import Reqeust from '../common/Request';
import Config from '../common/Config';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import GankListItem from './GankListItem';


@observer
export default class GankListContainer extends Component {

    @observable
    dataSource = [];
    @observable
    isRefresh = false;
    @observable
    page = 1;

    componentDidMount() {
        this.fetchData(this.page);
    };

    fetchData=(page) =>{
        if (this.isRefresh){
            console.log('isRefresh?')
            return;
        }
        console.log(page);
        this.isRefresh = true;
        let type = encodeURIComponent(this.props.type);
        // console.log(type);
        let url = `${Config.api.getGankData}?page=${page}&type=${type}`
        console.log(url);
        // let url = `http://gank.io/api/data/${this.props.type}/20/1`
        return Reqeust.get(url,(data)=>{
            if (data &&data.success) {
                let results = data.data.results;
                results.map((item, i) => {
                    let imageWidth = SCREEN_WIDTH / 2 - 15;
                    let imageHeight = imageWidth * 1.15;
                    imageHeight = parseInt(Math.random() * 100 + imageHeight);
                    item.imageHeight = imageHeight;
                    item.imageWidth = imageWidth;
                    if (item.images) {
                        item.isImage = true;
                        for (let i = 0 ;i <item.images.length ; i++){
                            let image = item.images[i];
                            Image.getSize(image, (width, height) => {
                                item.imageWidth = width;
                                item.imageHeight = height;
                                // console.log(width);
                                // console.log(height);
                            });
                        }
                    }else {
                        item.isImage = false;
                    }

                });
                // console.log(results.length);
                if (page > 1){
                    console.log('大于1了?');
                    this.dataSource = this.dataSource.concat(results);
                }else {
                    this.dataSource = results;
                }

                this.isRefresh = false;
            }
        },(error)=>{
            console.log(error);
        });
    }

    fetchMoreData = ()=> {
        this.page = this.page + 1;
        console.log(this.page);
        this.fetchData(this.page);
    };

    renderItem = (item)=>{
        const {navigate} = this.props;
        return (
            // GankItem(navigate,item)
            <GankListItem navigate={navigate} itemData={item}/>
        )
    };

    render() {
        return (
        <FlatList
            data={this.dataSource}
            keyExtractor={item => item._id}
            renderItem={({item})=>this.renderItem(item)}
            onRefresh={() => this.fetchData(1)}
            refreshing={this.isRefresh}
            onEndReached={() => this.fetchMoreData()}
            onEndReachedThreshold={0}
        />
    );
    }
}

const GankItem = (navigate , itemData) => {
    let imageHeight,imageWidth;
    if (itemData.imageHeight && itemData.imageWidth){
        // console.log('图片默认宽度:'+itemData.imageWidth);
        // console.log('图片默认高度:'+itemData.imageHeight);

        imageWidth = SCREEN_WIDTH;
        imageHeight = itemData.imageHeight;
        // console.log('SCREEN_HEIGHT:' + SCREEN_HEIGHT);
        if (imageHeight > SCREEN_HEIGHT) {
            imageHeight = itemData.imageWidth / itemData.imageHeight * SCREEN_WIDTH;
        }
        // console.log(`裁剪后:${imageHeight}`);
    }
    return (
        <View style={{marginTop:5,backgroundColor:'white'}}>
            <Text style={styles.itemTitleStyle}>{itemData.desc}</Text>
            {
                itemData.isImage > 0
                    ? <Image source={{uri:itemData.images[0]}}
                             style={{height:imageHeight,width:imageWidth,resizeMode:'contain'}}
                    />
                    : null

            }
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.itemTitleStyle,{fontSize:FONT_SIZE(14)}]}>
                    {itemData.who}
                </Text>
                <Text style={[styles.itemTitleStyle,{fontSize:FONT_SIZE(14)}]}>
                    {itemData.publishedAt}
                </Text>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({

    itemTitleStyle:{
        fontSize:FONT_SIZE(16),
        padding:5
    }
});

