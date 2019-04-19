import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  static BASE_URL = 'https://dataservice.accuweather.com/';
  static LOCATION_URL = ConstantService.BASE_URL + 'locations/v1/';
  static FORECAST_URL = ConstantService.BASE_URL + 'forecasts/v1/';
  static CURRENT_CONDITIONS_URL = ConstantService.BASE_URL + 'currentconditions/v1/';
  static API_KEY = environment;
  static API_HOST = environment.API_HOST;

  constructor() { }
}
