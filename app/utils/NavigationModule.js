/**
 * @flow
 * Created by Rabbit on 2019/04/08.
 */

import { NavigationActions } from 'react-navigation';

let _navigator;

function setNavigatorRef(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  setNavigatorRef,
};