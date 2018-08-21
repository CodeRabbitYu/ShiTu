//
//  UMSociallogMacros.h
//  UMSocialCore
//
//  Created by 张军华 on 16/9/7.
//  Copyright © 2016年 张军华. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "UMCommonLogMacros.h"


//简易函数类似于系统的NSLog函数,线程安全
#define UMSocialLogError  UMShareLogError
#define UMSocialLogWarn   UMShareLogWarn
#define UMSocialLogInfo   UMShareLogInfo
#define UMSocialLogDebug  UMShareLogDebug
#define UMSocialLogVerbose UMShareLogVerbose


//日志国际化的相关的函数和宏
FOUNDATION_EXPORT NSString* UMSocialLogWithLocalizedKey(NSString* key);
#define UMSocialLogLocalizedString(key) UMSocialLogWithLocalizedKey(key)


