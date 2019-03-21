import { Injectable } from '@angular/core';
import { RegionIntf } from '../interfaces/region-Intf';
import { StorageService } from './storage.service';
import { GeocoderService } from './geocoder-service.service';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private STORAGE_REGION_LIST = "RegionList";

  public googleMapsInitialized: Subject<null> = new Subject<null>();
  googleMapsInitialized$: Observable<null> = this.googleMapsInitialized.asObservable();

  private regionsListUpdated: Subject<null> = new Subject<null>();
  regionsListUpdated$: Observable<null> = this.regionsListUpdated.asObservable();

  constructor(
    private geocoderService: GeocoderService
  ) { }

  setRegionList(data: RegionIntf[]) {
    let locationPromises = Promise.all(data.map(d => {
      return new Promise((resolve) => {
        this.geocoderService.codeAddresses(d.EnglishName).then((result) => {
          resolve({
            ...d,
            location: result
          })
        });
      });
    }));
    locationPromises.then(result => {
      StorageService.set(this.STORAGE_REGION_LIST, result);
      this.regionsListUpdated.next();
    })
  }

  getRegionList(): RegionIntf[]  {
    return StorageService.get(this.STORAGE_REGION_LIST);
  }
}
