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


    constructor(props){
        super(props);
        this.state = {
            defaultData :[],
        }
    }

    componentDidMount() {
        let type = encodeURIComponent(this.props.type);
        // console.log(type);
        let url = `${Config.api.getGankData}?page=${1}&type=${type}`
        // let url = `http://gank.io/api/data/${this.props.type}/20/1`
        Reqeust.get(url,(data)=>{
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
            this.setState({
                defaultData:[{
                    _id:'test'
                }]
            });

            const { navigate } = this.props;
            console.log(navigate);

        },(error)=>{
            console.log(error);
        });
    }
    getAutoResponsiveProps() {
        return {
            itemMargin: 8,
        };
    }

    renderWelfareItem = ()=>{
        const { navigate } = this.props;
        return this.dataSource.map((item, i) => {
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
    };

    renderItem =()=>{

        return(
            <AutoResponisve {...this.getAutoResponsiveProps()}>
                {this.renderWelfareItem()}
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
