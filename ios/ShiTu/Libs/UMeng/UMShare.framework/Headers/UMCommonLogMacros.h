//
//  UMCommonLogMacros.h
//  testUMCommonLog
//
//  Created by 张军华 on 2017/11/29.
//  Copyright © 2017年 张军华. All rights reserved.
//

#import <Foundation/Foundation.h>

#define USing_CommonLog_Reflection

#ifndef USing_CommonLog_Reflection

#import "UMCommonLogConfig.h"

/**
 *  根据等级打印日志
 *  @param component   打印对应的组件 @see UMCommonComponent
 *  @param logFlag     控制打印分级的枚举变量 @see UMCommonLogFlag
 *  @param file        打印日志的文件
 *  @param function    打印日志的函数
 *  @param line        打印的日志的行数
 *  @param format      需要打印的日志格式内容
 *  @param ...         可变参数
 *  @dicuss 本库不需要直接调用，可以用简易函数宏 @see UMCommonLogError,UMCommonLogWarn,UMCommonLogInfo,UMCommonLogDebug
 */
FOUNDATION_EXPORT void UMCommonLog(UMCommonComponent component,UMCommonLogFlag logFlag,const char* file,const char* function,NSUInteger line,NSString *format, ...) NS_FORMAT_FUNCTION(6,7);


//UMCommon的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMCommonLogError(format, ...)   UMCommonLog(UMCommonComponent_UMCommon,UMCommonLogFlagError,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogWarn(format, ...)   UMCommonLog(UMCommonComponent_UMCommon,UMCommonLogFlagWarning,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogInfo(format, ...)   UMCommonLog(UMCommonComponent_UMCommon,UMCommonLogFlagInfo,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogDebug(format, ...)   UMCommonLog(UMCommonComponent_UMCommon,UMCommonLogFlagDebug,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogVerbose(format, ...)   UMCommonLog(UMCommonComponent_UMCommon,UMCommonLogFlagVerbose,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)


//UMAnalytics的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMAnalyticsLogError(format, ...)   UMCommonLog(UMCommonComponent_UMAnalytics,UMCommonLogFlagError,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogWarn(format, ...)   UMCommonLog(UMCommonComponent_UMAnalytics,UMCommonLogFlagWarning,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogInfo(format, ...)   UMCommonLog(UMCommonComponent_UMAnalytics,UMCommonLogFlagInfo,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogDebug(format, ...)   UMCommonLog(UMCommonComponent_UMAnalytics,UMCommonLogFlagDebug,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogVerbose(format, ...)   UMCommonLog(UMCommonComponent_UMAnalytics,UMCommonLogFlagVerbose,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)

//UMPush 的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMPushLogError(format, ...)   UMCommonLog(UMCommonComponent_UMPush,UMCommonLogFlagError,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogWarn(format, ...)   UMCommonLog(UMCommonComponent_UMPush,UMCommonLogFlagWarning,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogInfo(format, ...)   UMCommonLog(UMCommonComponent_UMPush,UMCommonLogFlagInfo,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogDebug(format, ...)   UMCommonLog(UMCommonComponent_UMPush,UMCommonLogFlagDebug,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogVerbose(format, ...)   UMCommonLog(UMCommonComponent_UMPush,UMCommonLogFlagVerbose,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)

//UMShare 的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMShareLogError(format, ...)   UMCommonLog(UMCommonComponent_UMShare,UMCommonLogFlagError,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogWarn(format, ...)   UMCommonLog(UMCommonComponent_UMShare,UMCommonLogFlagWarning,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogInfo(format, ...)   UMCommonLog(UMCommonComponent_UMShare,UMCommonLogFlagInfo,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogDebug(format, ...)   UMCommonLog(UMCommonComponent_UMShare,UMCommonLogFlagDebug,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogVerbose(format, ...)   UMCommonLog(UMCommonComponent_UMShare,UMCommonLogFlagVerbose,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)

#else

#define UMCommonLog                         UMCommonLog##UMShareSuffix
#define UMCommonPrefixSubNameLog            UMCommonPrefixSubNameLog##UMShareSuffix
#define registerUMComponent                 registerUMComponent##UMShareSuffix
#define setUMCommonComponentLevel           setUMCommonComponentLevel##UMShareSuffix
#define getUMCommonLogManager               getUMCommonLogManager##UMShareSuffix
#define getMetaUMCommonLogManager           getMetaUMCommonLogManager##UMShareSuffix
#define checkUMCommonLogManager             checkUMCommonLogManager##UMShareSuffix
#define checkValidUMCommonLogLevel          checkValidUMCommonLogLevel##UMShareSuffix
#define doUMCommonLog                       doUMCommonLog##UMShareSuffix
#define doUMCommonPrefixSubNameLog          doUMCommonPrefixSubNameLog##UMShareSuffix

FOUNDATION_EXPORT BOOL registerUMComponent(NSInteger component,NSString* prefixName,NSString* componentVersion);
FOUNDATION_EXPORT BOOL setUMCommonComponentLevel(NSInteger component,NSUInteger componentLevel);
FOUNDATION_EXPORT void UMCommonLog(NSInteger component,NSInteger logFlag,const char* file,const char* function,NSUInteger line,NSString *format, ...) NS_FORMAT_FUNCTION(6,7);
FOUNDATION_EXPORT void UMCommonPrefixSubNameLog(NSInteger component,NSInteger logFlag,const char* prefixSubName,const char* file,const char* function,NSUInteger line,NSString *format, ...) NS_FORMAT_FUNCTION(7,8);

//获得UMCommonLog.bundle的国际化的字符串宏和对应的函数
#define  UMCommonLogTableNameForUMCommonUMShareSuffix  @"UMSocialPromptLocalizable"
#define  UMCommonLogBundleNameForUMCommonUMShareSuffix  @"UMCommonLog"
#define  UMCommonLogBundle   UMCommonLogBundle##UMShareSuffix
FOUNDATION_EXPORT NSBundle* UMCommonLogBundle();
#define UMLocalizedStringForUMCommonSuffix(key) NSLocalizedStringWithDefaultValue(key,UMCommonLogTableNameForUMCommonUMShareSuffix,UMCommonLogBundle(), @"", nil)


//UMCommon的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMCommonLogError(format, ...)       UMCommonLog(1,1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogWarn(format, ...)        UMCommonLog(1,2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogInfo(format, ...)        UMCommonLog(1,4,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogDebug(format, ...)       UMCommonLog(1,8,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonLogVerbose(format, ...)     UMCommonLog(1,16,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)

//UMCommon的分级日志宏
#define UMCommonPrefixSubName   ".Network"
#define UMCommonPrefixSubNameLogError(format, ...)       UMCommonPrefixSubNameLog(1,1,UMCommonPrefixSubName,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogWarn(format, ...)       UMCommonPrefixSubNameLog(1,2,UMCommonPrefixSubName,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogInfo(format, ...)       UMCommonPrefixSubNameLog(1,4,UMCommonPrefixSubName,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogDebug(format, ...)       UMCommonPrefixSubNameLog(1,8,UMCommonPrefixSubName,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogVerbose(format, ...)       UMCommonPrefixSubNameLog(1,16,UMCommonPrefixSubName,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)

#define UMCommonPrefixSubName1   ".Core"
#define UMCommonPrefixSubNameLogError1(format, ...)       UMCommonPrefixSubNameLog(1,1,UMCommonPrefixSubName1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogWarn1(format, ...)       UMCommonPrefixSubNameLog(1,2,UMCommonPrefixSubName1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogInfo1(format, ...)       UMCommonPrefixSubNameLog(1,4,UMCommonPrefixSubName1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogDebug1(format, ...)       UMCommonPrefixSubNameLog(1,8,UMCommonPrefixSubName1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogVerbose1(format, ...)       UMCommonPrefixSubNameLog(1,16,UMCommonPrefixSubName1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)


#define UMCommonPrefixSubNameLogError2(UMCommonPrefixSubName2,format, ...)       UMCommonPrefixSubNameLog(1,1,UMCommonPrefixSubName2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogWarn2(UMCommonPrefixSubName2,format, ...)       UMCommonPrefixSubNameLog(1,2,UMCommonPrefixSubName2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogInfo2(UMCommonPrefixSubName2,format, ...)       UMCommonPrefixSubNameLog(1,4,UMCommonPrefixSubName2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogDebug2(UMCommonPrefixSubName2,format, ...)       UMCommonPrefixSubNameLog(1,8,UMCommonPrefixSubName2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMCommonPrefixSubNameLogVerbose2(UMCommonPrefixSubName2,format, ...)       UMCommonPrefixSubNameLog(1,16,UMCommonPrefixSubName2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
//UMAnalytics的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMAnalyticsLogError(format, ...)    UMCommonLog(2,1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogWarn(format, ...)     UMCommonLog(2,2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogInfo(format, ...)     UMCommonLog(2,4,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogDebug(format, ...)    UMCommonLog(2,8,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMAnalyticsLogVerbose(format, ...)  UMCommonLog(2,16,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)

//UMPush 的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMPushLogError(format, ...)         UMCommonLog(3,1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogWarn(format, ...)          UMCommonLog(3,2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogInfo(format, ...)          UMCommonLog(3,4,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogDebug(format, ...)         UMCommonLog(3,8,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMPushLogVerbose(format, ...)       UMCommonLog(3,16,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)

//UMShare 的日志宏
//简易函数类似于系统的NSLog函数,线程安全
#define UMShareLogError(format, ...)        UMCommonLog(4,1,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogWarn(format, ...)         UMCommonLog(4,2,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogInfo(format, ...)         UMCommonLog(4,4,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogDebug(format, ...)        UMCommonLog(4,8,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#define UMShareLogVerbose(format, ...)      UMCommonLog(4,16,__FILE__,__PRETTY_FUNCTION__,__LINE__,format,##__VA_ARGS__)
#endif
