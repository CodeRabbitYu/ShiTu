/**
 * Created by Rabbit on 2017/12/16.
 */

import React, { StyleSheet, Platform } from 'react-native'


let ppp = {
    height:0,
    width:0,
}

let arr = ['height', 'width', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'paddingTop', 'paddingLeft'
    , 'paddingRight', 'paddingBottom', 'top', 'left', 'right', 'bottom', 'minHeight', 'maxHeight', 'minWidth','maxWidth'];

class _StyleSheet {

    static create(styleSheets) {
        let keys = Object.keys(styleSheets);
        keys.map((key) => {
            Object.keys(styleSheets[key]).map((property) => {
                let _new = styleSheets[key][property];
                arr.map((item) => {
                    if (item === property){
                        _new = px2dp(styleSheets[key][property]);
                        // console.log(property , px2dp(styleSheets[key][property]));
                    }
                });
                styleSheets[key][property] = _new;
                delete px2dp(styleSheets[key][property]);
            })
        })
        return StyleSheet.create(styleSheets)
    }

    static flatten(styleSheets) {
        return StyleSheet.flatten(styleSheets)
    }
}

export {_StyleSheet as StyleSheet}
