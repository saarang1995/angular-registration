import { Injectable } from '@angular/core';
import { RegionIntf } from '../interfaces/region-Intf';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private STORAGE_REGION_LIST = "RegionList";
  constructor() { }

  setRegionList(data: RegionIntf) {
    StorageService.set(this.STORAGE_REGION_LIST, data);
  }
}
