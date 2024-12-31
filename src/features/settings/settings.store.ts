import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { storage } from '~/utils/storage';

class SettingsStore {
  isDarkMode: boolean = storage.getBoolean('darkMode') ?? false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDarkMode() {
    const toggledValue = !this.isDarkMode;
    runInAction(() => (this.isDarkMode = toggledValue));
    storage.set('darkMode', toggledValue);
  }
}

export const settingsStore = new SettingsStore();

autorun(() => {
  console.info('DarkMode: ', settingsStore.isDarkMode);
});
