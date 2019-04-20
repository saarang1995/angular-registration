import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  static API_HOST = environment.API_HOST;
  static API_KEY = environment;
  // static LOCATION_URL = ConstantService.API_HOST + 'locations/v1/';
  // static FORECAST_URL = ConstantService.BASE_URL + 'forecasts/v1/';
  // static CURRENT_CONDITIONS_URL = ConstantService.BASE_URL + 'currentconditions/v1/';
  
  constructor() { }
}
