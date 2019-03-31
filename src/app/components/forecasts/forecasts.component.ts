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
      debugger;
    });
    debugger;

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

  setCityForForecast(cityDetail: any) {
    const cityName = cityDetail.selectedOptions[0].innerText;
    const locationKey = cityDetail.value;
    if (!cityName && !locationKey) {
      return;
    }
    this.apiService.fetchForecastForDay(cityName, locationKey);
  }
  // getCountryListForRegion(regionId: string) {
  //   this.apiService.fetchCountryList(regionId).subscribe((data: CountryIntf[]) => {
  //     this.countryList = data;
  //   });
  // }
}
