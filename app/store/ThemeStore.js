/**
 * @flow
 * Created by Rabbit on 2019-04-29.
 */

import { action, observable } from 'mobx';
import DefaultTheme from '../resource/thems/DefaultTheme';
import BlackTheme from '../resource/thems/BlackTheme';
import CustomTheme from '../resource/thems/CustomTheme';

class ThemeStore {
  @observable themes: any = DefaultTheme;

  @action.bound
  setThemes(themes?: any) {
    this.themes = themes;
    Theme.set(themes);
  }

  @action.bound
  setBlackTheme() {
    this.themes = BlackTheme;
    Theme.set(BlackTheme);
  }

  @action.bound
  setSingleThemes(key: string, value: any) {
    const themesArr = [DefaultTheme, BlackTheme, CustomTheme];

    themesArr.map(theme => {
      theme[key] = value;
    });

    this.themes[key] = value;
    Theme.set(this.themes);
  }
}

export { ThemeStore };
