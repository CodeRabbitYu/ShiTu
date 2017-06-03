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

import Request from '../../common/Request';
import Config from '../../common/Config';
import AutoResponisve from 'autoresponsive-react-native';
import Button from '../../component/Button';

import { connect } from 'react-redux';
import { welfareData } from '../../actions/GankWelfareData';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


/**
 * 初始化状态
 */
let isLoading = true;
let isLoadMore = false;
let isRefreshing = false;
let isFirstLoad = true;
let page = 1;

@observer
class WelfareContainer extends Component {
    // @observable
    // dataSource = [];
    // @observable
    // isLoad = false;
    // @observable
    // isRefresh = false;
    // @observable
    // page = 1;
    // @observable
    // isLoadMore = false;

    constructor(props){
        super(props);
        this.state = {
            defaultData : [{
                _id: 'test'
            }],
            dataSource:[],
            // isLoad:false,
            // isLoadMore:false,
        }
    }

    componentWillMount(){
        console.log('componentWillMount');

        // this.fetchData(this.page);
        const { navigate } = this.props;
        // console.log(navigate);

    }

    componentDidMount(){
        console.log('componentDidMount');

        this.props.welfareData(page, this.props.type, isLoading, isLoadMore, isRefreshing);
    }

    fetchData=(page) =>{
        let type = encodeURIComponent(this.props.type);
        // console.log(type);
        let url = `${Config.api.getGankData}?page=${page}&count=${'20'}&type=${type}`;

        if (this.isRefresh){
            console.log('isRefresh?');
            return;
        }
        // console.log(page);

        if (page !== 1){
            this.isLoadMore = true;
        }else {
            this.isRefresh = true;
        }

        console.log(url);
        Request.get(url,(data)=>{
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

        isLoadMore = true;
        isLoading = false;
        isRefreshing = false;
        page += 1;
        console.log(`page:${page}`);
        this.props.welfareData(page, this.props.type, isLoading, isLoadMore, isRefreshing);

        console.log('加载更多数据');
        if (isLoadMore) {
            return;
        } else {
            // this.fetchData(this.page);
            // console.log(this.page);
        }
    };

    renderItem =()=>{
        const { navigate } = this.props;
        // console.log(navigate);

        let { welfareData } = this.props.GankReducer;

        console.log(welfareData);
        return(
            <AutoResponisve {...this.getAutoResponsiveProps()}>
               { WelfareItem(navigate,welfareData)}
            </AutoResponisve>
        )
    };

    _onRefresh = () => {
        console.log('_onRefresh');
        isLoading = false;
        isLoadMore = false;
        isRefreshing = true;
        this.props.welfareData(1, this.props.type, isLoading, isLoadMore, isRefreshing);
        // console.log(this.props.GankReducer);
    };

    render() {
        console.log('render');
        // console.log(this.props.GankReducer);
        const { isRefreshing } = this.props.GankReducer;
        isFirstLoad = false;
        // console.log(welfareData);
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    data={this.state.defaultData}
                    keyExtractor={item => item._id}
                    numColumns={2}
                    onRefresh={this._onRefresh}
                    refreshing={isRefreshing}
                    renderItem={this.renderItem}
                    onEndReached={this.fetchMoreData}
                    onEndReachedThreshold={0}
                    ListFooterComponent={()=>{
                            return( !isRefreshing &&
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

const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
        backgroundColor:'#F5F5F5',
    },
    loadDataStyle: {
        marginVertical:20,
        marginTop:20
    },
});

const WelfareItem = (navigate,dataSource) => {
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

export default connect((state) => {
    const { GankReducer } = state;
    return {
        GankReducer
    };
},{ welfareData })(WelfareContainer)

