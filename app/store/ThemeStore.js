/**
 * @flow
 * Created by Rabbit on 2019-04-29.
 */

import { action, observable, runInAction } from 'mobx';
import DefaultTheme from '../resource/thems/DefaultTheme';
import BlackTheme from '../resource/thems/BlackTheme';

class ThemeStore {
  @observable themes: any = DefaultTheme;

  @action.bound
  setThemes(themes: any) {
    this.themes = themes;
    Theme.set(themes);
  }

  @action.bound
  setBlackTheme() {
    this.themes = BlackTheme;
    Theme.set(BlackTheme);
  }
}

export { ThemeStore };
