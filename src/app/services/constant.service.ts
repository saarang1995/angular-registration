import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  static BASE_URL = 'https://dataservice.accuweather.com/locations/v1/';
  static FORECAST_BASE_URL = "https://dataservice.accuweather.com/forecasts/v1/";
  static CURRENT_CONDITIONS_URL = "https://dataservice.accuweather.com/currentconditions/v1/"
  static API_KEY = environment.ACCU_WEATHER_API_KEY;
  constructor() { }
}
