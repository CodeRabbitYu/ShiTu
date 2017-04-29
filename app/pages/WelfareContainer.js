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
    Image,
    TouchableOpacity
} from 'react-native';

import Reqeust from '../common/Request';
import Config from '../common/Config';
import AutoResponisve from 'autoresponsive-react-native';
import Button from '../component/Button';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

@observer
export default class WelfareContainer extends Component {
    @observable
    dataSource = [];
    @observable
    isRefresh = false;

    page = 1;
    constructor(props){
        super(props);
        this.state = {
            defaultData :[],
        }
    }

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
                    // console.log(item);
                });

                if (page > 1){
                    console.log('大于1了?')
                    this.dataSource = this.dataSource.concat(results);
                }else {
                    this.dataSource = results;
                }

                this.isRefresh = false;
                this.setState({
                    defaultData: [{
                        _id: 'test'
                    }]
                });
            }
        },(error)=>{
            console.log(error);
        });
    };

    refreshData = async ()=>{
        // 正常使用fetch请求,用这个方法应该是没有问题的.我现在的封装会有点小问题,以后解决
        let data = await this.fetchData();
        console.log(data);
    };

    componentDidMount() {

        this.fetchData(this.page);

        // const { navigate } = this.props;
        // console.log(navigate);

    }
    getAutoResponsiveProps() {
        return {
            itemMargin: 8,
        };
    }

    fetchMoreData = ()=> {
        this.page = this.page + 1;
        console.log(this.page);
        this.fetchData(this.page);
    }

    renderItem =()=>{
        const { navigate } = this.props;
        return(
            <AutoResponisve {...this.getAutoResponsiveProps()}>
                { WelfareItem(navigate,this.dataSource)}
            </AutoResponisve>
        )
    };

    render() {
        return (
            <FlatList
                data={this.state.defaultData}
                keyExtractor={item => item._id}
                renderItem={()=>this.renderItem()}
                numColumns={2}
                onRefresh={() => this.fetchData(1)}
                refreshing={this.isRefresh}
                onEndReachedThreshold={10}
                onEndReached={() => this.fetchMoreData()}
            />
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

const WelfareItem = (navigate,dataSource) => {
    // console.log(navigate);
    // console.log(dataSource);
    return dataSource.map((item, i) => {
        return (
            <TouchableOpacity key = {i}
                              style={{height:item.imageHeight,width:item.imageWidth}}
                              onPress={()=>{
                                      navigate('WelfarePicture',{
                                            title:'图片详情',
                                            url:item.url,
                                            isVisible:false
                                        });
                                  }}
            >
                <Image
                    source={{uri:item.url}}
                    style={{
                              height:item.imageHeight,
                              width:item.imageWidth,
                              marginHorizontal:10,
                              marginVertical:10,
                              }}
                />
            </TouchableOpacity>
        );
    }, this);
}
