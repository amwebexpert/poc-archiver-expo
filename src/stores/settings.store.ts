import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { AppTheme, DARK_THEME, LIGHT_THEME } from '~/theme/theme';

class SettingsStore {
  darkMode: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDarkMode() {
    const toggledValue = !this.darkMode;
    runInAction(() => (this.darkMode = toggledValue));
    console.info('===> this.darkMode', this.isDarkMode);
  }

  get currentTheme(): AppTheme {
    return this.darkMode ? DARK_THEME : LIGHT_THEME;
  }

  get isDarkMode() {
    return this.darkMode;
  }
}

export const settingsStore = new SettingsStore();

autorun(() => {
  console.info('DarkMode: ', settingsStore.isDarkMode);
});
