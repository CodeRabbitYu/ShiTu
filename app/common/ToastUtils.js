/**
 * 弹窗组件
 */


import Toast from 'react-native-root-toast';

let toast;

/**
 * 短时间(2000ms)弹窗
 * @param content 内容
 * @param onShow  显示前回调函数
 * @param onShown 显示后回调函数
 * @param onHide  隐藏前回调函数
 * @param onHidden 隐藏后回调函数
 */
export const toastShort = (content,onShow,onShown,onHide,onHidden) =>{
    if(toast !== undefined){
        Toast.hide(toast);
    }
    toast = Toast.show(content.toString(),{
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: onShow,
        onShown:onShown,
        onHide: onHide,
        onHidden:onHidden
    })
};
/**
 * 长时间(3500ms)弹窗
 * @param content 内容
 * @param onShow  显示前回调函数
 * @param onShown 显示后回调函数
 * @param onHide  隐藏前回调函数
 * @param onHidden 隐藏后回调函数
 */
export const toastLong = (content,onShow,onShown,onHide,onHidden) => {
    if(toast !==undefined ){
        Toast.hide(toast);
    }
    toast = Toast.show(content.toString(),{
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: onShow,
        onShown:onShown,
        onHide: onHide,
        onHidden:onHidden
    })
};