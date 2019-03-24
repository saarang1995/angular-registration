import { Injectable } from '@angular/core';
import { RegionIntf } from '../interfaces/region-Intf';
import { StorageService } from './storage.service';
import { GeocoderService } from './geocoder-service.service';
import { Subject, Observable } from 'rxjs';
import { UserDetailsIntf } from '../interfaces/user-details-intf';
import { AuthResponse } from '../interfaces/auth-response-intf';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private STORAGE_REGION_LIST = "RegionList";
  private STORAGE_KEY_USER = "UserDetails";

  private userDetails: UserDetailsIntf;

  public googleMapsInitialized: Subject<null> = new Subject<null>();
  googleMapsInitialized$: Observable<null> = this.googleMapsInitialized.asObservable();

  private regionsListUpdated: Subject<null> = new Subject<null>();
  regionsListUpdated$: Observable<null> = this.regionsListUpdated.asObservable();

  private userDetailsChangeEvent: Subject<null> = new Subject<null>();
  userDetailsChangeEvent$: Observable<null> = this.userDetailsChangeEvent.asObservable();

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

  getRegionList(): RegionIntf[] {
    return StorageService.get(this.STORAGE_REGION_LIST);
  }

  setUserDetails(user: UserDetailsIntf) {
    this.userDetails = { ...user };
    StorageService.set(this.STORAGE_KEY_USER, user);
    this.userDetailsChangeEvent.next();
  }

  getUserDetails(): UserDetailsIntf {
    return this.userDetails;
  }

  isUserLoggedIn() {
    return !!this.userDetails;
  }

  isExistingUser(user: UserDetailsIntf): AuthResponse {
    const userData = this.getUserDetails();
    if (!!userData) {
      if (user.email == userData.email) {
        if (user.password == userData.password) {
          return { status: "Authorized" };
        }
        else {
          return { status: "Incorrect Password" };
        }
      }
    }
    else {
      return { status: "Not Registered" };
    }

  }
}
