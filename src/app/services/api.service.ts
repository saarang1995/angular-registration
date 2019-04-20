import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from './constant.service';
import { DatabaseService } from './database.service';
import { RegionIntf } from '../interfaces/region-Intf';
import { Router } from '@angular/router';
import { UserDetailsIntf } from '../interfaces/user-details-intf';
import { finalize, map, catchError, debounceTime } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ResponseIntf } from '../interfaces/responseIntf';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private FETCH_REGION_REQUEST = ConstantService.API_HOST + 'fetch_regions';
  private FETCH_FORECAST_DAY = ConstantService.API_HOST + 'fetch_forecast_of_day';
  private FETCH_COUNTRY_LIST = ConstantService.API_HOST + 'fetch_countries';
  private FETCH_TOP_COUNTRY_LIST = ConstantService.API_HOST + 'fetch_top_cities';
  private FETCH_CURRENT_CONDITIONS = ConstantService.API_HOST + 'current_conditions';

  private SIGNUP_ENDPOINT = ConstantService.API_HOST + 'create_user';
  private LOGIN_ENDPOINT = ConstantService.API_HOST + 'login';
  private AUTHENTICATE_ENDPOINT = ConstantService.API_HOST + 'authenticate';

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService,
    private router: Router,
    private helperService: HelperService
  ) { }

  tokenExpired(data) {
    alert(data.error.message);
    this.router.navigateByUrl('/login');
  }
  fetchRegionList() {
    return this.http.
      post(this.FETCH_REGION_REQUEST, {}).
      subscribe(
        (data: { success: boolean, message: RegionIntf[] }) => {
          if (data.success) {
            this.databaseService.setRegionList(data.message);          }

        }, error => {
        });
  }

  fetchForecastForDay(cityName: string, locationKey: string) {
    return this.http.
      post(this.FETCH_FORECAST_DAY, { locationKey: locationKey }).
      subscribe(
        (data: { success: boolean, message: any }) => {
          if (data.success) {
            this.databaseService.addDailyForecast(cityName, locationKey, data.message);
          }

        }, error => {
          this.tokenExpired(error);
        });
  }

  fetchCountryList(regionID: string) {
    return this.http.
      post(this.FETCH_COUNTRY_LIST, { regionID: regionID });
  }

  fetchTopCities() {
    const topCities = this.databaseService.getTopCities();
    if (topCities && topCities.length) {
      this.databaseService.topCitiesChangeEvent.next();
      return;
    }
    else {
      return this.http.
        post(this.FETCH_TOP_COUNTRY_LIST, {}).subscribe(
          (data: { success: boolean, message: any }) => {
            if (data.success) {
              this.databaseService.setTopCities(data.message);
            }
          });
    }
  }

  fetchCurrencyConditions(locationKey: number) {
    return this.http.
      post(this.FETCH_CURRENT_CONDITIONS, { locationKey: locationKey });
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
    return this.http.post(this.SIGNUP_ENDPOINT, userObject).pipe(
      catchError((response: any) => {
        alert(response.error.message);
        return throwError(response);
      })
    ).subscribe((response: ResponseIntf) => {
      if (response.success == true) {
        this.databaseService.setAuthenticationToken(response.token);

        if (!!this.helperService.getRedirectUrl) {
          this.router.navigateByUrl("");
        }
        else {
          this.helperService.performRedirectIfAny();
        }
      }
      else {
        alert(response.error.message);
      }
    });;
  }

  authenticate(token: string) {
    return this.http.
      post(this.AUTHENTICATE_ENDPOINT, { token: token });
  }
}
