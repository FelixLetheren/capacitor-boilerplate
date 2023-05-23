/** Global variable for storing the availability of native local storage, avoids unnecessary checks. */
let available: boolean | null = null;

export const StorageKeys = { authTokenKey: 'auth-token', testKey: 'test' } as const;
const StorageValues = Object.values(StorageKeys);
type IStorageKeys = typeof StorageValues[number];

type IStorage = {
  [key in IStorageKeys]?: string;
};

/** Global memory storage - used when native local storage is unavailable. */
let memoryStorage: IStorage = {};

/**
 * Checks whether native local storage is available.
 * - Uses global availability variable to avoid unnecessary checks.
 * @returns `true` if native local storage is available, else `false`
 */
function localStorageAvailable(): boolean {
  if (available !== null) {
    return available;
  }

  if (typeof localStorage === 'undefined') {
    return false;
  }

  const key = '__local_storage_test__';

  try {
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    available = true;
  } catch (err) {
    available = false;
  }

  return available;
}

/**
 * Sets a key/value pair in the available local storage.
 * @param key The key to set.
 * @param value The value to set.
 */
export function setItem(key: IStorageKeys, value: string) {
  if (localStorageAvailable()) {
    localStorage.setItem(key, value);
  } else {
    memoryStorage[key] = value;
  }
}

/**
 * Gets a value from the available local storage for a specified key.
 * @param key The key to get for.
 * @returns The value as a `string` if it exists, else `null`.
 */
export function getItem(key: IStorageKeys): string | null {
  if (localStorageAvailable()) {
    return localStorage.getItem(key);
  }
  return memoryStorage[key] ?? null;
}

/**
 * Removes a key/value pair from the available local storage.
 * @param key The key to remove.
 */
export function removeItem(key: IStorageKeys) {
  if (localStorageAvailable()) {
    localStorage.removeItem(key);
  } else {
    delete memoryStorage[key];
  }
}

/**
 * Clears the available local storage for *all* keys.
 */
export function clear() {
  if (localStorageAvailable()) {
    localStorage.clear();
  }
  memoryStorage = {};
}

export function removeItemsWithPrefix(prefix: string): void {
  if (localStorageAvailable()) {
    Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => {
        if (key in StorageKeys) {
          removeItem(key as IStorageKeys);
        }
      });
  } else {
    Object.keys(memoryStorage)
      .filter(key => key.startsWith(prefix))
      .forEach(key => {
        if (key in StorageKeys) {
          removeItem(key as IStorageKeys);
        }
      });
  }
}

/**
 * An optional class to use as an interface with the available local storage.
 * - Receives a `key` at construction so it doesn't have to be passed into every method.
 * - Allows value to be a generic type by using JSON parsing.
 */
export class LocalStore<T = string> {
  private key: IStorageKeys;

  constructor(key: IStorageKeys) {
    this.key = key;
  }

  /**
   * Sets a key/value pair in the available local storage.
   * - Uses then key passed to the class constructor.
   * @param value The value to set.
   */
  public set(value: T) {
    const valueToSet = typeof value === 'string' ? value : JSON.stringify(value);
    setItem(this.key, valueToSet);
  }

  /**
   * Gets a value from the available local storage.
   * - Uses then key passed to the class constructor.
   * @returns The value if it exists, else `null`.
   */
  public get(): T | null {
    const value = getItem(this.key);
    if (value === null) {
      return value;
    }
    try {
      return JSON.parse(value) as T;
    } catch (e) {
      /** couldn't parse value, it is likely just a string value */
      return value as unknown as T;
    }
  }

  /**
   * Removes a key/value pair from the available local storage.
   * - Uses then key passed to the class constructor.
   */
  public clear() {
    removeItem(this.key);
  }
}
