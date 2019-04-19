import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static KEY_PREFIX = '[RecknWeather]';

  constructor() { }

  static set(key, value) {
    localStorage.setItem(StorageService.KEY_PREFIX + key, JSON.stringify(value));
  }

  static get(key) {
    const item = localStorage.getItem(StorageService.KEY_PREFIX + key);
    if (item && item != 'undefined') return JSON.parse(item);
    else return null;
  }

  static delete(key) {
    localStorage.removeItem(StorageService.KEY_PREFIX + key);
  }
}
