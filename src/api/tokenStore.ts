import { getItem, removeItem, setItem, StorageKeys } from '../helpers/safeLocalStorage';

export class AuthTokenStore {
  static save(token: string) {
    setItem(StorageKeys.authTokenKey, token);
  }

  static get() {
    return getItem(StorageKeys.authTokenKey);
  }

  static clear() {
    return removeItem(StorageKeys.authTokenKey);
  }
}
