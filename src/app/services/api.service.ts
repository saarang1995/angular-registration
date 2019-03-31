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

  FETCH_REGION_REQUEST = ConstantService.BASE_URL + 'regions';
  FORECAST_DAY = ConstantService.BASE_URL + 'daily/1day/'
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

  fetchForecastForDay(locationKey: number) {
    return this.http.
    get(this.FORECAST_DAY + locationKey).
    subscribe(
      (data: any) => {
        this.databaseService.setDailyForecasts(data);
      });
  }

  logoutUser(shouldRedirectToLoginPage: boolean) {
    if (shouldRedirectToLoginPage) {
      this.router.navigateByUrl('/login');
    }
    this.databaseService.deleteUserDetails();
  }
}
