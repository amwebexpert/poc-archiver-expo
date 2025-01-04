import { makeAutoObservable, runInAction } from 'mobx';
import { storage, StorageKey } from '~/utils/storage';

class SettingsStore {
  isDarkMode: boolean = storage.getBoolean(StorageKey.DARK_MODE) ?? false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDarkMode() {
    const toggledValue = !this.isDarkMode;
    runInAction(() => (this.isDarkMode = toggledValue));
    storage.set(StorageKey.DARK_MODE, toggledValue);
  }
}

export const settingsStore = new SettingsStore();
