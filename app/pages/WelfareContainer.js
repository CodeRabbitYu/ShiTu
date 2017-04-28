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
    ScrollView,
    RefreshControl,
    Image
} from 'react-native';

import Reqeust from '../common/Request';
import Config from '../common/Config';
import WelfareItem from './WelfareItem';
import AutoResponisve from 'autoresponsive-react-native';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

@observer
export default class WelfareContainer extends Component {
    @observable
    dataSource = [];
    @observable
    isRefresh = false;

    componentDidMount() {
        let type = encodeURIComponent(this.props.type);
        // console.log(type);
        let url = `${Config.api.getGankData}?page=${1}&type=${type}`
        // let url = `http://gank.io/api/data/${this.props.type}/20/1`
        Reqeust.get(url,(data)=>{
            // console.log(data);

            let results = data.data.results;
            results.map((item, i) => {
                let imageWidth  = SCREEN_WIDTH / 2 - 15;
                let imageHeight = imageWidth * 1.15;
                imageHeight = parseInt(Math.random()*100 + imageHeight);
                item.imageHeight = imageHeight;
                item.imageWidth = imageWidth;
                // console.log(item);
            });

            this.dataSource = results;

        },(error)=>{
            console.log(error);
        });
    }
    getAutoResponsiveProps() {
        return {
            itemMargin: 8,
        };
    }
    render() {
        return (
            <ScrollView
                ref={scrollView => this.scrollView = scrollView}
                style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                automaticallyAdjustContentInsets={false}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                bounces={true}
                refreshControl={
                        <RefreshControl
                            refreshing={this.isRefresh}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
            >
                <AutoResponisve {...this.getAutoResponsiveProps()}>
                    {
                        this.dataSource.map((item,i)=>{
                            return(
                                <Image
                                    key = {i}
                                    source={{uri:item.url}}
                                    style={{
                                          height:item.imageHeight,
                                          width:item.imageWidth,
                                          marginHorizontal:10,
                                          marginVertical:10,
                                          }}
                                />
                            )
                        })
                    }
                </AutoResponisve>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:10,
    },
});
