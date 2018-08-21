//
//  AidProtocol.h
//  UtdidSDK
//
//  Created by ALLEN on 14-12-22.
//  Copyright (c) 2014年 Alvin. All rights reserved.
//

#ifndef AidProtocol_h
#define AidProtocol_h

#define EVENT_REQUEST_STARTED 1000
#define EVENT_REQUEST_SUCCESS 1001
#define EVENT_REQUEST_FAILED 1002
#define EVENT_NETWORK_ERROR 1003

@protocol AidProtocolDelegate <NSObject>
@required
- (void) onAidEventChanged:(NSInteger)eventId
                       aid:(NSString *)aid;
@end

#endif
