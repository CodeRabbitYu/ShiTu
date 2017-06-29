/**
 * Created by Rabbit on 2017/6/29.
 */

import { MyApp } from '../APP';


export default function StackReducer(state , action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = MyApp.router.getStateForAction(action, state);
            break;
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}