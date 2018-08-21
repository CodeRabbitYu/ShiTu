//
//  UMConfigure.h
//  UMCommon
//
//  Created by San Zhang on 9/6/16.
//  Copyright © 2016 UMeng. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface UMConfigure : NSObject

/** 初始化友盟所有组件产品
 @param appKey 开发者在友盟官网申请的appkey.
 @param channel 渠道标识，可设置nil表示"App Store".
 */
+ (void)initWithAppkey:(NSString *)appKey channel:(NSString *)channel;

/** 设置是否在console输出sdk的log信息.
 @param bFlag 默认NO(不输出log); 设置为YES, 输出可供调试参考的log信息. 发布产品时必须设置为NO.
 */
+ (void)setLogEnabled:(BOOL)bFlag;

/** 设置是否对日志信息进行加密, 默认NO(不加密).
 @param value 设置为YES, umeng SDK 会将日志信息做加密处理
 */
+ (void)setEncryptEnabled:(BOOL)value;

+ (NSString *)umidString;

/**
 集成测试需要device_id
 */
+ (NSString*)deviceIDForIntegration;



@end
