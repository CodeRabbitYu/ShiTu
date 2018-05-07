/**
 * @flow
 * Created by Rabbit on 2018/5/7.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  CameraRoll
} from 'react-native';

import { Button, FastImage } from "../../../components";
import { System } from "../../../utils";
import FetchBolb from 'react-native-fetch-blob';
const Dirs = FetchBolb.fs.dirs


type Props = {
  navigation: any;
};
export class WealPictureDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    console.log(this.props.navigation.state.params.url);
  }

  saveImage = (url: string) => {
    
    CameraRoll.saveToCameraRoll(url, 'photo')
      .then((data)=>{
        console.log(data)
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  saveAndroidImage = (url: string) => {

    let lastIndex = url.lastIndexOf('/');
    let imageName = url.substr(lastIndex);
    console.log(imageName);

    /**
     * 1、path 是图片的sd中的路径
     * 2、如果出现保存慢的情况，可以把下面的注释部分代码打开，但那样会存储两张照片，需要手动删除一张
     * 3、我发现下载的方法，会导致存储缓慢，重启之后就正常了。 不知道是不是模拟器问题
     * */

    FetchBolb.config({
      fileCache: true,
      path: Dirs.DCIMDir + imageName
    })
      .fetch("GET", url)
      .then(data=> {
        console.log(data)

        // let path = 'file://' + data.data;
        // CameraRoll.saveToCameraRoll(path, 'photo')
        //   .then((data)=>{
        //     console.log(data)
        //     // alert(data);
        //   })
        //   .catch((error)=>{
        //     console.log(error);
        //     // alert(error);
        //   });

      })
      .catch(e=>{
        console.log(e)
      })
  }

  render() {
    const url = this.props.navigation.state.params.url

    return (
      <Button onPress={()=> this.saveAndroidImage(url)}
              // onLongPress={()=> this.saveAndroidImage(url)}
      >
        <FastImage style={styles.container}
                   source={{uri: url}}
                   resizeMode={'contain'}
        />
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: System.SCREEN_HEIGHT,
    width: System.SCREEN_WIDTH
  },
});