/**
 * Created by Rabbit on 2019-08-12.
 * @flow
 */

import React, { useState } from 'react';
// import PropTypes, { any } from 'prop-types';
import { Animated, Image as ImageNative, StyleSheet, View, Platform } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

type ImageType = {
  placeholderStyle: any,
  PlaceholderContent: any,
  containerStyle: any,
  style: any,
  ImageComponent: any,
  children: any,
  ...ImageStyle
};

const CustomImage = ({
  placeholderStyle,
  PlaceholderContent,
  containerStyle,
  style,
  ImageComponent,
  children,
  ...attributes
}: ImageType) => {
  const [placeholderOpacity] = useState(new Animated.Value(1));
  const [imageError, setImageError] = useState(false);
  const hasImage = typeof attributes.source !== 'undefined';

  const onLoad = () => {
    setImageError(false);
    const minimumWait = 100;
    const staggerNonce = 200 * Math.random();

    setTimeout(
      () => {
        Animated.timing(placeholderOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: Platform.OS !== 'android'
        }).start();
      },
      Platform.OS === 'android' ? 0 : Math.floor(minimumWait + staggerNonce)
    );
  };

  const onError = () => {
    setImageError(true);
  };

  return (
    <View accessibilityIgnoresInvertColors={true} style={StyleSheet.flatten([styles.container, containerStyle])}>
      <ImageComponent
        {...attributes}
        onLoad={onLoad}
        onError={onError}
        style={[
          StyleSheet.absoluteFill,
          {
            width: style.width,
            height: style.height
          }
        ]}
        testID="RNE__Image"
      />

      <Animated.View
        pointerEvents={hasImage ? 'none' : 'auto'}
        accessibilityElementsHidden={hasImage}
        importantForAccessibility={hasImage ? 'no-hide-descendants' : 'yes'}
        style={[
          styles.placeholderContainer,
          {
            opacity: hasImage ? placeholderOpacity : 1
          }
        ]}
      >
        <View
          testID="RNE__Image__placeholder"
          style={StyleSheet.flatten([style, styles.placeholder, placeholderStyle])}
        >
          {PlaceholderContent}
        </View>
      </Animated.View>

      <View style={style}>{children}</View>

      {imageError && (
        <FastImage
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' }}
          style={[containerStyle, style]}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'transparent',
    position: 'relative'
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject
  },
  placeholder: {
    backgroundColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

// CustomImage.propTypes = {
//   ...ImageStyle,
//   ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//   PlaceholderContent: any,
//   containerStyle: any,
//   placeholderStyle: ImageNative.propTypes.style
// };

CustomImage.defaultProps = {
  ImageComponent: FastImage,
  style: {}
};

export default CustomImage;
