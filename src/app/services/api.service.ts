import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from './constant.service';
import { DatabaseService } from './database.service';
import { RegionIntf } from '../interfaces/region-Intf';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private FETCH_REGION_REQUEST = ConstantService.BASE_URL + 'regions';
  private FETCH_FORECAST_DAY = ConstantService.FORECAST_BASE_URL + 'daily/1day/';
  private FETCH_COUNTRY_LIST = ConstantService.BASE_URL + 'countries/';
  private FETCH_TOP_COUNTRY_LIST = ConstantService.BASE_URL + 'topcities/50';

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

  logoutUser(shouldRedirectToLoginPage: boolean) {
    if (shouldRedirectToLoginPage) {
      this.router.navigateByUrl('/login');
    }
    this.databaseService.deleteUserDetails();
  }
}
