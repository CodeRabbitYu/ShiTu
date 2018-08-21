//
//  UTDevice.h
//  
//
//  Created by Alvin on 4/21/13.
//
//  设备信息的分装类：sdk合作开发需要用这个类提供的设备信息接口

//  Version:utdid4all-1.1.0

#ifndef UTDIDDevice_h
#define UTDIDDevice_h

#import "AidProtocol.h"

@interface UTDevice : NSObject

/**
 * @brief                       获取SDK生成的设备唯一标识.
 *
 * @warning                     调用说明:这个设备唯一标识是持久的,并且格式安全,iOS6以及以下,多应用互通.
 *
 *                              调用顺序:utdid任意时刻都可以调用.
 *
 * @return                      24字节的设备唯一标识.
 */
+(NSString *) utdid;

/**
 * @brief                       同步获得AID.
 *
 * @warning                     调用说明:若本地端没有最新AID，将耗费远程通信时间并阻塞线程，建议将此调用置于非主线程，或使用{@link getAidAsync}异步获得AID。
 *
 *                              调用顺序:aid任意时刻都可以调用.
 *
 * @return                      AID.
 */
+(NSString *) aid:(NSString *)appName
            token:(NSString *)token;

/**
 * @brief                       异步请求AID.
 *
 * @warning                     调用说明:若本地端没有最新AID，将建立异步请求获得AID，
 *
 *                              调用顺序:aidAsync任意时刻都可以调用.
 *
 * @return                      AID.
 */
+(void) aidAsync:(NSString *)appName
                 token:(NSString *)token
           aidDelegate:(id<AidProtocolDelegate>)aidDelegate;

@end

#endif
