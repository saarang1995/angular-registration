import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from './constant.service';
import { DatabaseService } from './database.service';
import { RegionIntf } from '../interfaces/region-Intf';
import { Router } from '@angular/router';
import { UserDetailsIntf } from '../interfaces/user-details-intf';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private FETCH_REGION_REQUEST = ConstantService.LOCATION_URL + 'regions';
  private FETCH_FORECAST_DAY = ConstantService.FORECAST_URL + 'daily/1day/';
  private FETCH_COUNTRY_LIST = ConstantService.LOCATION_URL + 'countries/';
  private FETCH_TOP_COUNTRY_LIST = ConstantService.LOCATION_URL + 'topcities/50';
  private FETCH_CURRENT_CONDITIONS = ConstantService.CURRENT_CONDITIONS_URL;

  private LOGIN_ENDPOINT = ConstantService.API_HOST + 'create_user';
  private AUTHENTICATE_ENDPOINT = ConstantService.API_HOST + 'authenticate';

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  fetchRegionList() {
    return this.http.
      get(this.FETCH_REGION_REQUEST).
      subscribe(
        (data: RegionIntf[]) => {
          this.databaseService.setRegionList(data);
        }, error => {
        });
  }

  fetchForecastForDay(cityName: string, locationKey: string) {
    return this.http.
      get(this.FETCH_FORECAST_DAY + locationKey).
      subscribe(
        (data: any) => {
          this.databaseService.addDailyForecast(cityName, locationKey, data);
        });
  }

  fetchCountryList(regionID: string) {
    return this.http.
      get(this.FETCH_COUNTRY_LIST + regionID);
  }

  fetchTopCities() {
    const topCities = this.databaseService.getTopCities();
    if (topCities && topCities.length) {
      this.databaseService.topCitiesChangeEvent.next();
      return;
    }
    else {
      return this.http.
        get(this.FETCH_TOP_COUNTRY_LIST).subscribe(
          (data) => {
            this.databaseService.setTopCities(data);
          });
    }
  }

  fetchCurrencyConditions(locationKey: number) {
    return this.http.
      get(this.FETCH_CURRENT_CONDITIONS + locationKey);
  }

  logoutUser(shouldRedirectToLoginPage: boolean) {
    if (shouldRedirectToLoginPage) {
      this.router.navigateByUrl('/login');
    }
    this.databaseService.deleteUserDetails();
  }

  signIn(userObject: UserDetailsIntf) {
    return this.http.post(this.LOGIN_ENDPOINT, userObject);
  }

  signUp(userObject: UserDetailsIntf) {
    return this.http.post(this.LOGIN_ENDPOINT, userObject);
  }

  authenticate(token: string) {
    return this.http.
      post(this.AUTHENTICATE_ENDPOINT, { token: token });
  }
}
