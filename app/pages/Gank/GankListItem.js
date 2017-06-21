/**
 * Created by Rabbit on 2017/5/4.
 */

import React, { Component,PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,

} from 'react-native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

// import ImageResizer  from 'react-native-image-resizer';


export default class GankListItem extends Component {

    static defaultProps = {
        navigate: React.PropTypes.object,
        itemData: React.PropTypes.object,
        itemPress:React.PropTypes.func,
    };

    constructor(props){
        super(props);
        this.state = {
            isFullImage:false,
            resizedImageUri:'',
            newDate:'',
            imageHeight:'',
        }
    };

    _onLayout(event){
        // console.log(event.nativeEvent.layout);
    };

    _onProgress(loaded,total){
        // console.log(loaded);
        // console.log(total);
    };


    _componentDidMount(){
        let imageHeight,imageWidth;
        let {itemData} = this.props;
        // console.log(itemData.images[0]);
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


        let timestamp2 = Date.parse(new Date(itemData.publishedAt));
        timestamp2 = timestamp2 / 1000;
        let newDate = new Date();
        newDate.setTime(timestamp2 * 1000);
        newDate = newDate.toLocaleDateString();

        let imageUri = itemData.images? itemData.images[0]:'';
        // console.log(image);

        this.setState({
            newDate:newDate,
            imageHeight:imageHeight,
        });

        ImageResizer.createResizedImage(imageUri, 600, 600, 'PNG', 90)
            .then((resizedImageUri) => {
            // console.log(resizedImageUri);
            // console.log(imageHeight);
                this.setState({
                    //resizedImageUri : resizedImageUri,
                });
            }).catch((err) => {
            console.log(err);
            // return alert('Unable to resize the photo',
            //     'Check the console for full the error message');
        });
    }

    render() {
        let {itemData} = this.props;

        // itemData.isImage
        //     ?
        //     ImageResizer.createResizedImage(itemData.images[0], SCREEN_WIDTH, 600, 'PNG', 90)
        //         .then((resizedImageUri) => {
        //             // console.log(resizedImageUri);
        //             // this.resizedImageUri = resizedImageUri;
        //             itemData.imageUrl = resizedImageUri;
        //
        //             // console.log(resizedImageUri);
        //         }).catch((err) => {
        //         console.log(err);
        //         // return alert('Unable to resize the photo',
        //         //     'Check the console for full the error message');
        //     })
        //     :null;
        // console.log(itemData);
        // let imageFullHeight = this.state.isFullImage ?
        //     {height:SCREEN_HEIGHT - 64-49-44,resizeMode:'contain'} :
        //     {height:this.state.imageHeight,resizeMode:'contain'};

        // console.log(this.state.resizedImageUri);
        return (
            <TouchableOpacity style={{marginTop:5,backgroundColor:'white'}} onPress={this.props.itemPress} activeOpacity={0.9}>
                <Text style={styles.itemTitleStyle}>{itemData.desc}</Text>
                {
                    itemData.isImage
                        ?
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={()=>{
                                this.setState({
                                    isFullImage: !this.state.isFullImage,
                                })
                            }}>


                            <Image source={{uri:itemData.imageURL}}
                                   style={[{width:SCREEN_WIDTH,height:300}]}
                                   onLayout={this._onLayout}
                                   indicator={Progress.CircleSnail}
                                // onProgress={(e)=>this._onProgress(e.nativeEvent.loaded,e.nativeEvent.total)}
                            />

                        </TouchableOpacity>

                        : null

                }
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Icon name="md-ribbon" style={styles.itemIconStyle}  />
                    <Text style={[styles.itemTitleStyle,{fontSize:FONT_SIZE(14)}]}>
                        {itemData.who}
                    </Text>
                    <Icon name="md-time" style={{marginLeft:5}} size={25}/>
                    <Text style={[styles.itemTitleStyle,{fontSize:FONT_SIZE(14)}]}>
                        {itemData.newDate}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemTitleStyle:{
        fontSize:FONT_SIZE(16),
        padding:5
    },
    itemIconStyle:{
        fontSize: 25,
        marginLeft:5
    }
});

