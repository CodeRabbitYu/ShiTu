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
    ActivityIndicator,
    InteractionManager,
    TouchableOpacity
} from 'react-native';

import Request from '../../common/Request';
import Config from '../../common/Config';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import GankListItem from './GankListItem';
import WebViewDetail from '../Component/WebViewDetail';

@observer
export default class GankListContainer extends Component {

    @observable
    dataSource = [];
    @observable
    isRefresh = false;
    @observable
    page = 1;
    @observable
    isLoad = false;
    @observable
    isLoadMore = false;
    @observable
    resizedImageUri = null;
    state = {
        imageHeight:'',
        imageWidth:'',
    }

    componentDidMount() {
        this.fetchData(this.page);
    }

    fetchData = (page) =>{
        let type = encodeURIComponent(this.props.type);

        let url = `${Config.api.gank.listData}?page=${page}&count=${'10'}&type=${type}`;
        console.log(url);
        if (this.isRefresh){
            console.log('isRefresh?');
            return;
        }
        if (this.is)
        console.log(page);

        if (page !== 1){
            this.isLoadMore = true;
        }else {
            this.isRefresh = true;
        }

        // console.log(url);
         Request.get(url,(data)=>{
            // console.log(data);
            if (data &&data.success) {
                let results = data.data.results;
                results.map((item, i) => {
                    // 处理后台返回的时间
                    let timestamp2 = Date.parse(new Date(item.publishedAt));
                    timestamp2 = timestamp2 / 1000;
                    let newDate = new Date();
                    newDate.setTime(timestamp2 * 1000);
                    item.newDate = newDate.toLocaleDateString();

                    if (item.images) {
                        item.isImage = true;
                        let image = item.images[0];
                        // item.imageURL = image;
                        item.imageURL = `${image}?imageView2/0/w/${SCREEN_WIDTH}/format/jpg/interlace/1/q/100`;

                    }else {
                        item.isImage = false;
                        item.imageURL = '';
                    }
                });
                // console.log(results.length);

                if (page !== 1){
                    console.log('大于1了?');

                    this.isLoadMore = false;
                    this.isRefresh = false;
                    this.dataSource = this.dataSource.concat(results);
                }else {
                    this.isLoad = false;
                    this.isRefresh = false;
                    this.page = 1;
                    this.dataSource = results;
                }

                // this.isRefresh = false;
            }
        },(error)=>{
            console.log(error);
        });
    };

    fetchMoreData = ()=> {
        if (this.isLoadMore) {
            return;
        } else {
            // return;
            this.page = this.page + 1;
            // console.log(this.page);
            this.fetchData(this.page);
        }
    };

    itemPress = (item) =>{
        const {navigate} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigate('WebViewDetail', {
                data: item.url,
                isVisible:true
            });
        });
    };

    renderItem =(item)=>{
        const {navigate} = this.props;
        return (
            // GankItem(navigate,item)
            <GankListItem navigate={navigate} itemData={item} itemPress={()=>this.itemPress(item)}/>
        )
    };

    render() {
        return (
            <View style={styles.containerStyle}>
            <FlatList
                style={{backgroundColor:'#F5F5F5',flex:1}}
                data={this.dataSource}
                initialNumToRender={5}
                keyExtractor={item => item._id}
                renderItem={({item})=>this.renderItem(item)}
                onRefresh={() => this.fetchData(1)}
                refreshing={this.isRefresh}
                onEndReached={() => this.fetchMoreData()}
                onEndReachedThreshold={1}
                removeClippedSubviews={ false }
                ListFooterComponent={()=>{
                                return( !this.isRefresh &&
                                    <ActivityIndicator
                                        style={styles.loadDataStyle}
                                    />
                                )
                            }}
            />
            </View>
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
                    ?
                    <TouchableOpacity activeOpacity={0.9}
                                      onPress={()=>{
                                        {/*this.setState({*/}
                                            {/*isFullImage: !this.state.isFullImage,*/}
                                        {/*})*/}
                                    }}>
                        <Image source={{uri:itemData.images[0]}}
                                 style={{height:imageHeight,width:imageWidth,resizeMode:'contain'}}
                        />
                    </TouchableOpacity>
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
    containerStyle:{
        // flex:1,
        height:SCREEN_HEIGHT - 49 - 64 - 44
    },
    itemTitleStyle:{
        fontSize:FONT_SIZE(16),
        padding:5
    },
    loadDataStyle: {
        marginVertical:20,
        marginTop:20
    },
});

