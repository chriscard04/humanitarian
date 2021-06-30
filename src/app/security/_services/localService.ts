import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const SecureStorage = require('secure-web-storage');
const SECRET_KEY = '@mcro$$';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private storageService: StorageService) { }

  // Set the json data to local 
  public setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }
  // Get the json value from local 
  public getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }// Clear the local 

  public clearToken() {
    return this.storageService.secureStorage.clear();
  }

}
