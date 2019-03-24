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

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  fetchRegionList() {
    return this.http.
      get(this.FETCH_REGION_REQUEST, {
        params: {
          apikey: ConstantService.API_KEY
        }
      }).
      subscribe(
        (data: RegionIntf[]) => {
          this.databaseService.setRegionList(data);
        }, error => {
        });
  }

  logoutUser(shouldRedirectToLoginPage: boolean) {
    if (shouldRedirectToLoginPage) {
      this.router.navigateByUrl('/login');
    }
    this.databaseService.deleteUserDetails();
  }
}
