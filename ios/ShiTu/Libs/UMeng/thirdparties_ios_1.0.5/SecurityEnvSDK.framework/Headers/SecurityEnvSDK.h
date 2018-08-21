//
//  SecurityEnvSDK.h
//  SecurityGuardMain
//
//  Created by asherli on 2017/07/12.
//  Copyright © 2016年 alibaba. All rights reserved.
//

#ifndef SECURITYENV_SECURITY_ENV_SDK_H
#define SECURITYENV_SECURITY_ENV_SDK_H

#import <Foundation/Foundation.h>
#import "ISecurityEnvInitListener.h"

@interface SecurityEnvSDK : NSObject

- (NSInteger) initSync;

- (void) initASync : (ISecurityEnvInitListener *) listener;

- (NSString*) getToken;

// build by mtl

@end

#endif /* SECURITYENV_SECURITY_ENV_SDK_H */
