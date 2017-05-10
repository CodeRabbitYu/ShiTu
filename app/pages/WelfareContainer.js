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
    // Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import Reqeust from '../common/Request';
import Config from '../common/Config';
import AutoResponisve from 'autoresponsive-react-native';
import Button from '../component/Button';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

@observer
export default class WelfareContainer extends Component {
    // @observable
    // dataSource = [];
    @observable
    isLoad = false;
    @observable
    isRefresh = false;
    @observable
    page = 1;
    @observable
    isLoadMore = false;

    constructor(props){
        super(props);
        this.state = {
            defaultData :[],
            dataSource:[],
            // isLoad:false,
            // isLoadMore:false,
        }
    }

    componentWillMount(){
        console.log('componentWillMount');
        this.fetchData(this.page);
        const { navigate } = this.props;
        // console.log(navigate);

    }

    fetchData=(page) =>{
        let type = encodeURIComponent(this.props.type);
        // console.log(type);
        let url = `${Config.api.getGankData}?page=${page}&type=${type}`;

        if (this.isRefresh){
            console.log('isRefresh?');
            return;
        }
        console.log(page);

        if (page !== 1){
            this.isLoadMore = true;
        }else {
            this.isRefresh = true;
        }

        console.log(url);
        Reqeust.get(url,(data)=>{
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

                setTimeout(()=> {
                    if (page !== 1) {
                        console.log('page不等于1');

                        this.isLoadMore = false;
                        this.isRefresh = false;

                        this.setState({
                            dataSource : this.state.dataSource.concat(results)
                        });
                        // this.state.dataSource = this.state.dataSource.concat(results);
                    } else {
                        // this.state.dataSource = results;
                        this.isLoad = true;
                        this.isRefresh = false;
                        this.page = 1;
                        this.setState({
                            // isLoad: true,
                            dataSource:results,
                        });


                        console.log('page等于1');
                        // this.isLoad = true;
                    }
                },500);


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


    getAutoResponsiveProps() {
        return {
            itemMargin: 8,
        };
    };

    fetchMoreData = ()=> {

        if (this.isLoadMore) {
            return;
        } else {
            this.page = this.page + 1;
            this.fetchData(this.page);
            // console.log(this.page);
        }
    };

    renderItem =()=>{
        const { navigate } = this.props;
        // console.log(this.props.navigate);
        return(
            <AutoResponisve {...this.getAutoResponsiveProps()}>
                { WelfareItem(navigate,this.state.dataSource)}
            </AutoResponisve>
        )
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    data={this.state.defaultData}
                    keyExtractor={item => item._id}
                    renderItem={()=>this.renderItem()}
                    numColumns={2}
                    onRefresh={() => this.fetchData(1)}
                    refreshing={this.isRefresh}
                    onEndReached={() => this.fetchMoreData()}
                    onEndReachedThreshold={0}
                    ListFooterComponent={()=>{
                            return( !this.isRefresh &&
                                <ActivityIndicator
                                />
                            )
                        }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
        backgroundColor:'#F5F5F5',
    },
    loadDataStyle: {
        marginVertical:20,
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
                                            isVisible:true
                                        });
                                  }}
            >
                <Image
                    source={{uri:item.url}}
                    indicator={Progress.CircleSnail}
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
};
