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

// 使用Redux需要调用的状态
import { connect } from 'react-redux';
import { welfareData } from '../../actions/GankWelfareData';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


/**
 * redux初始化状态
 */
let isLoading = true;
let isLoadMore = false;
let isRefreshing = false;
let isFirstLoad = true;
let page = 1;


@observer
class WelfareContainer extends Component {
    @observable
    dataSource = [];
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
            // 如果使用redux,需要给defaultData赋初值,可以参考fetchData最后
            defaultData : [],
            dataSource:[],
            // isLoad:false,
            // isLoadMore:false,
        }
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.fetchData(this.page);

        // 使用redux获取数据
        //this.props.welfareData(page, this.props.type, isLoading, isLoadMore, isRefreshing);
    }

    fetchData=(page) =>{
        let type = encodeURIComponent(this.props.type);
        // console.log(type);
        let url = `${Config.api.getGankData}?page=${page}&count=${'20'}&type=${type}`;

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

        /**
         *  使用redux实现加载更多的方法

        isLoadMore = true;
        isLoading = false;
        isRefreshing = false;
        page += 1;
         */
        //this.props.welfareData(page, this.props.type, isLoading, isLoadMore, isRefreshing);

        console.log('加载更多数据');
        // 使用普通的方式实现
        if (this.isLoadMore) {
            return;
        } else {
            this.page = this.page + 1;
            this.fetchData(this.page);
        }
    };

    renderItem =()=>{
        const { navigate } = this.props;
        // console.log(navigate);

        // 使用redux需要传递的参数,如果使用,需要将welfareData放在WelfareItem第二个参数的地方
        let { welfareData } = this.props.GankReducer;

        return(
            <AutoResponisve {...this.getAutoResponsiveProps()}>
               { WelfareItem(navigate,this.state.dataSource)}
            </AutoResponisve>
        )
    };

    // 如果使用redux需要传递一些参数到action,所以单独使用了一个方法,如果不使用redux可以不调用
    _onRefresh = () => {
        isLoading = false;
        isLoadMore = false;
        isRefreshing = true;
        page = 1;
        this.props.welfareData(page, this.props.type, isLoading, isLoadMore, isRefreshing);
        isFirstLoad = false;
        // console.log(this.props.GankReducer);
    };

    render() {
        console.log('render');

        // 利用redux管理页面的刷新
        const { isRefreshing } = this.props.GankReducer;


        // console.log(welfareData);
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    data={this.state.defaultData}
                    keyExtractor={item => item._id}
                    numColumns={2}
                    onRefresh={()=>this.fetchData(1)}
                    refreshing={this.isRefresh}
                    renderItem={this.renderItem}
                    onEndReached={()=>this.fetchMoreData()}
                    onEndReachedThreshold={0}
                    ListFooterComponent={()=>{
                        // 如果使用redux,this.isRefresh要改成isRefreshing
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

