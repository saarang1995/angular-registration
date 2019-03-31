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
  private STORAGE_DAILY_FORECAST = "DailyForecast";

  private userDetails: UserDetailsIntf;

  public googleMapsInitialized: Subject<null> = new Subject<null>();
  googleMapsInitialized$: Observable<null> = this.googleMapsInitialized.asObservable();

  private regionsListUpdated: Subject<null> = new Subject<null>();
  regionsListUpdated$: Observable<null> = this.regionsListUpdated.asObservable();

  private userDetailsChangeEvent: Subject<null> = new Subject<null>();
  userDetailsChangeEvent$: Observable<null> = this.userDetailsChangeEvent.asObservable();

  constructor(
    private geocoderService: GeocoderService
  ) {
    this.initUserDetails();
  }

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

  private initUserDetails() {
    if (!this.userDetails) {
      const userdata = StorageService.get(this.STORAGE_KEY_USER);
      if (userdata) {
        this.setUserDetails(userdata, false);
      }
    }
  }

  setUserDetails(user: UserDetailsIntf, saveChangeToStorage: boolean = true) {
    if (user == null) {
      this.userDetails = null;
    } else {
      this.userDetails = { ...user };
    }
    if (saveChangeToStorage) {
      StorageService.set(this.STORAGE_KEY_USER, user);
    }
    this.userDetailsChangeEvent.next();
  }

  deleteUserDetails() {
    this.setUserDetails(null, false);
    StorageService.delete(this.STORAGE_KEY_USER);
  }

  getUserDetails(): UserDetailsIntf {
    return this.userDetails;
  }

  isUserLoggedIn(): boolean {
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

  setDailyForecasts(data) {
    StorageService.set(this.STORAGE_DAILY_FORECAST,data);
  }

  getDailyForecasts(): RegionIntf[] {
    return StorageService.get(this.STORAGE_DAILY_FORECAST);
  }
}
