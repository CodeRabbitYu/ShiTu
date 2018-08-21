//
//  ISecurityEnvInitListener.h
//  SecurityEnvSDK
//
//  Created by asherli on 17/9/1.
//  Copyright © 2017年 alibaba. All rights reserved.
//

#ifndef SECURITYENV_ISECURITY_ENV_INITLISTENER_H
#define SECURITYENV_ISECURITY_ENV_INITLISTENER_H

#import <Foundation/Foundation.h>
#include "EnvExport.h"

@interface ISecurityEnvInitListener : NSObject

- (void) onUMIDInitFinished : (const char *) strToken : (int) status;

@end

#endif /* SECURITYENV_ISECURITY_ENV_INITLISTENER_H */
