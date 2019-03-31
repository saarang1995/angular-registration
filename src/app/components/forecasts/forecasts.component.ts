import { Component, OnInit } from '@angular/core';
import { RegionIntf } from 'src/app/interfaces/region-Intf';
import { DatabaseService } from 'src/app/services/database.service';
import { CountryIntf } from 'src/app/interfaces/country-intf';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ForecastIntf } from 'src/app/interfaces/forecast-intf';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss']
})
export class ForecastsComponent implements OnInit {

  existingForecastPreferences: boolean = false;
  showForecastPopup: boolean = false;
  regionList: RegionIntf[];
  countryList: CountryIntf[] = [];
  forecastForm: FormGroup;
  topCities: any = [];
  forecastList: ForecastIntf[];
  cityDetail: CityDetailIntf;

  constructor(
    private databaseService: DatabaseService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.regionList = this.databaseService.getRegionList();
    this.initializeForecastForm();
    this.apiService.fetchTopCities();
    this.forecastList = this.databaseService.getDailyForecasts();
    this.topCities = this.databaseService.getTopCities();
    this.databaseService.topCitiesChangeEvent$.subscribe(() => {
      this.topCities = this.databaseService.getTopCities();
    });
    this.databaseService.forecastListChangeEvent$.subscribe(() => {
      this.forecastList = this.databaseService.getDailyForecasts();
    });
    this.checkForUpdatesInExistingForecastData();
  }

  private checkForUpdatesInExistingForecastData() {
    const forecastList = this.databaseService.getDailyForecasts();
    if (!forecastList.length) {
      return;
    }
    const todayDate = new Date(Date.now()).getDate();
    forecastList.forEach(forecast => {
      if(!forecast){
        return;
      }
      if (todayDate == new Date(forecast.Headline.EffectiveDate).getDate()) {
        return;
      }
      this.apiService.fetchForecastForDay(forecast.cityName, forecast.locationKey);
    });
  }

  private initializeForecastForm() {
    this.forecastForm = new FormGroup({
      city: new FormControl("", [
        Validators.required
      ])
    });
  }

  showAddForecastPopup(status: boolean) {
    this.showForecastPopup = status;
  }

  setCityForForecast(selectedCity: any) {
    const cityName = selectedCity.selectedOptions[0].innerText;
    const locationKey = selectedCity.value;

    if (!cityName && !locationKey) {
      return;
    }
    this.cityDetail = {
      cityName: cityName,
      locationKey: locationKey
    };
  }

  addForecast() {
    this.apiService.fetchForecastForDay(this.cityDetail.cityName, this.cityDetail.locationKey);
    this.showForecastPopup = false;
  }
}

interface CityDetailIntf {
  cityName: string;
  locationKey: string;
}
